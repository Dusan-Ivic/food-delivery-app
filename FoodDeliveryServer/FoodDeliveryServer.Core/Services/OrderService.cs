using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Dto.Order;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;
using NetTopologySuite.Geometries;
using Stripe;
using Stripe.Checkout;
using Product = FoodDeliveryServer.Data.Models.Product;
using Microsoft.Extensions.Configuration;

namespace FoodDeliveryServer.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Order> _validator;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _clientSettings;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IStoreRepository storeRepository, IValidator<Order> validator, IMapper mapper, IConfiguration config)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;
            _clientSettings = config.GetSection("ClientSettings");
        }

        public async Task<List<GetOrderResponseDto>> GetOrders(long userId, UserType userType)
        {
            List<Order> orders = new List<Order>();

            switch (userType)
            {
                case UserType.Customer:
                    orders = await _orderRepository.GetOrdersByCustomer(userId);
                    break;
                case UserType.Partner:
                    orders = await _orderRepository.GetOrdersByPartner(userId);
                    break;
                case UserType.Admin:
                    orders = await _orderRepository.GetAllOrders();
                    break;
            }

            return _mapper.Map<List<GetOrderResponseDto>>(orders);
        }

        public async Task<CheckoutResponseDto> CreateCheckout(long customerId, CreateOrderRequestDto requestDto)
        {
            Order order = _mapper.Map<Order>(requestDto);
            order.CustomerId = customerId;

            ValidationResult validationResult = _validator.Validate(order);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            Point deliveryLocationPoint = _mapper.Map<Point>(order.Coordinate);

            if (!deliveryLocationPoint.IsValid)
            {
                throw new InvalidTopologyException("Delivery location is not a valid location");
            }

            deliveryLocationPoint.SRID = 4326;
            order.DeliveryLocation = deliveryLocationPoint;

            Store? store = await _storeRepository.GetStoreById(order.StoreId);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            order.Store = store;

            if (!deliveryLocationPoint.Within(store.DeliveryArea))
            {
                throw new AddressNotSupportedException("This store doesn't deliver to your location.");
            }

            foreach (OrderItem orderItem in order.Items)
            {
                Product? product = await _productRepository.GetProductById(orderItem.ProductId);

                if (product == null)
                {
                    // Should it throw exception and stop the order or just ignore this order item?
                    throw new ResourceNotFoundException($"Product with this id ({orderItem.ProductId}) doesn't exist");
                }

                if (product.StoreId != store.Id)
                {
                    throw new IncompatibleItemsError("All items in one order must be from the same store");
                }

                if (product.Quantity < orderItem.Quantity)
                {
                    throw new InsufficientQuantityException($"Not enough products available. Available quantity: {product.Quantity}");
                }

                // Save product's current information
                orderItem.ProductName = product.Name;
                orderItem.ProductPrice = product.Price;
                orderItem.ProductImage = product.Image;
                orderItem.ProductDescription = product.Description;

                orderItem.TotalPrice = orderItem.Quantity * product.Price;
            }

            order.ItemsPrice = order.Items.Aggregate(0m, (total, item) => total + item.TotalPrice);
            order.DeliveryFee = store.DeliveryFee;
            order.TotalPrice = order.ItemsPrice + order.DeliveryFee;
            order.CreatedAt = DateTime.UtcNow;

            List<SessionLineItemOptions> lineItems = order.Items.Select(item =>
            {
                List<string> lineItemImages = new List<string>();

                if (item.ProductImage != null)
                {
                    lineItemImages.Add(item.ProductImage);
                }

                return new SessionLineItemOptions()
                {
                    PriceData = new SessionLineItemPriceDataOptions()
                    {
                        ProductData = new SessionLineItemPriceDataProductDataOptions()
                        {
                            Name = item.ProductName,
                            Description = item.ProductDescription,
                            Images = lineItemImages,
                            Metadata = new Dictionary<string, string>()
                            {
                                { "ProductId", item.ProductId.ToString() },
                                { "Quantity", item.Quantity.ToString() }
                            }
                        },
                        UnitAmountDecimal = item.TotalPrice * 100,
                        Currency = "usd"
                    },
                    Quantity = 1
                };
            }).ToList();

            var clientDomain = _clientSettings.GetValue<string>("ClientDomain");

            var options = new SessionCreateOptions()
            {
                LineItems = lineItems,
                Metadata = new Dictionary<string, string>()
                {
                    { "CustomerId", order.CustomerId.ToString() },
                    { "StoreId", order.StoreId.ToString() },
                    { "Address", order.Address },
                    { "Coordinate", $"{order.Coordinate.X};{order.Coordinate.Y}" },
                },
                Mode = "payment",
                SuccessUrl = clientDomain + "/payment?status=success",
                CancelUrl = clientDomain + "/payment?status=cancel"
            };

            var service = new SessionService();

            Session session = service.Create(options);

            return new CheckoutResponseDto()
            {
                Order = _mapper.Map<CreateOrderResponseDto>(order),
                SessionUrl = session.Url
            };
        }

        public async Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto)
        {
            Order order = _mapper.Map<Order>(requestDto);
            order.CustomerId = customerId;

            ValidationResult validationResult = _validator.Validate(order);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            Point deliveryLocationPoint = _mapper.Map<Point>(order.Coordinate);

            if (!deliveryLocationPoint.IsValid)
            {
                throw new InvalidTopologyException("Delivery location is not a valid location");
            }

            deliveryLocationPoint.SRID = 4326;
            order.DeliveryLocation = deliveryLocationPoint;

            Store? store = await _storeRepository.GetStoreById(order.StoreId);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (!deliveryLocationPoint.Within(store.DeliveryArea))
            {
                throw new AddressNotSupportedException("This store doesn't deliver to your location.");
            }

            foreach (OrderItem orderItem in order.Items)
            {
                Product? product = await _productRepository.GetProductById(orderItem.ProductId);

                if (product == null)
                {
                    // Should it throw exception and stop the order or just ignore this order item?
                    throw new ResourceNotFoundException($"Product with this id ({orderItem.ProductId}) doesn't exist");
                }

                if (product.StoreId != store.Id)
                {
                    throw new IncompatibleItemsError("All items in one order must be from the same store");
                }

                if (product.Quantity < orderItem.Quantity)
                {
                    throw new InsufficientQuantityException($"Not enough products available. Available quantity: {product.Quantity}");
                }

                // Save product's current information
                orderItem.ProductName = product.Name;
                orderItem.ProductPrice = product.Price;
                orderItem.ProductImage = product.Image;

                orderItem.TotalPrice = orderItem.Quantity * product.Price;
                product.Quantity -= orderItem.Quantity;
            }

            order.ItemsPrice = order.Items.Aggregate(0m, (total, item) => total + item.TotalPrice);
            order.DeliveryFee = store.DeliveryFee;
            order.TotalPrice = order.ItemsPrice + order.DeliveryFee;
            order.CreatedAt = DateTime.UtcNow;

            try
            {
                order = await _orderRepository.CreateOrder(order);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<CreateOrderResponseDto>(order);
        }

        public async Task<DeleteOrderResponseDto> RefundOrder(long orderId, long customerId)
        {
            Order? order = await _orderRepository.GetOrderById(orderId);

            if (order == null)
            {
                throw new ResourceNotFoundException("Order with this id doesn't exist");
            }

            if (order.CustomerId != customerId)
            {
                throw new ActionNotAllowedException("Unauthorized to cancel this order. Only the creator can perform this action.");
            }

            DateTime deliveryTime = order.CreatedAt.AddMinutes((int)order.Store.DeliveryTimeInMinutes);

            if (DateTime.UtcNow > deliveryTime)
            {
                throw new OrderCancellationException("Cannot cancel the order because it has already been completed.");
            }

            var options = new RefundCreateOptions()
            {
                PaymentIntent = order.PaymentIntentId,
                Metadata = new Dictionary<string, string>()
                {
                    { "CustomerId", order.CustomerId.ToString() },
                    { "OrderId", order.Id.ToString() },
                }
            };

            var service = new RefundService();

            service.Create(options);

            return _mapper.Map<DeleteOrderResponseDto>(order);
        }

        public async Task<DeleteOrderResponseDto> CancelOrder(long orderId, long customerId)
        {
            Order? order = await _orderRepository.GetOrderById(orderId);

            if (order == null)
            {
                throw new ResourceNotFoundException("Order with this id doesn't exist");
            }

            if (order.CustomerId != customerId)
            {
                throw new ActionNotAllowedException("Unauthorized to cancel this order. Only the creator can perform this action.");
            }

            DateTime deliveryTime = order.CreatedAt.AddMinutes((int)order.Store.DeliveryTimeInMinutes);

            if (DateTime.UtcNow > deliveryTime)
            {
                throw new OrderCancellationException("Cannot cancel the order because it has already been completed.");
            }

            order.IsCanceled = true;
            order.Items.ForEach(item =>
            {
                item.Product.Quantity += item.Quantity;
            });

            try
            {
                await _orderRepository.UpdateOrder(order);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<DeleteOrderResponseDto>(order);
        }
    }
}
