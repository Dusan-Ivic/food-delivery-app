using FoodDeliveryServer.Common.Dto.Order;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IOrderService
    {
        public Task<List<GetOrderResponseDto>> GetOrders(long userId, UserType userType);
        public Task<CheckoutResponseDto> CreateCheckout(long customerId, CreateOrderRequestDto requestDto);
        public Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto);
        public Task<DeleteOrderResponseDto> RefundOrder(long orderId, long customerId);
        public Task<DeleteOrderResponseDto> CancelOrder(long orderId, long customerId);
    }
}
