using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Dto.Product;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<List<GetOrderResponseDto>> GetOrders(long userId, UserType userType);
        public Task<CheckoutResponseDto> CreateCheckoutSession(long customerId, CreateOrderRequestDto requestDto);
        public Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto);
        public Task<DeleteOrderResponseDto> CancelOrder(long orderId, long customerId);
    }
}
