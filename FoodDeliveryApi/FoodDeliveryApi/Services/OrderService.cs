using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Order> _validator;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IStoreRepository storeRepository, IValidator<Order> validator, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;
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

        public async Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto)
        {
            Order order = _mapper.Map<Order>(requestDto);
            order.CustomerId = customerId;

            ValidationResult validationResult = _validator.Validate(order);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            Store? store = await _storeRepository.GetStoreById(order.StoreId);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (store.City != order.City)
            {
                throw new AddressNotSupportedException("This store doesn't deliver to your address.");
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
            order.DeliveryFee = store.DeliveryOptions.DeliveryFee;
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

            DateTime deliveryTime = order.CreatedAt.AddMinutes((int)order.Store.DeliveryOptions.DeliveryTimeInMinutes);

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
