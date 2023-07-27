using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Order;
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
        private readonly IValidator<Order> _validator;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IValidator<Order> validator, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _validator = validator;
            _mapper = mapper;
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

            foreach (OrderItem orderItem in order.Items)
            {
                Product? product = await _productRepository.GetProductById(orderItem.ProductId);

                if (product == null)
                {
                    // Should it throw exception and stop the order or just ignore this order item?
                    throw new ResourceNotFoundException($"Product with this id ({orderItem.ProductId}) doesn't exist");
                }

                orderItem.TotalPrice = orderItem.Quantity * product.Price;
            }

            order.TotalPrice = order.Items.Aggregate(0m, (total, item) => total + item.TotalPrice);
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
    }
}
