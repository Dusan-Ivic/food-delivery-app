using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IOrderService
    {
        public Task<List<OrderResponseDto>> GetOrders(long userId, UserType userType);
        public Task<CheckoutResponseDto> CreateCheckout(long customerId, OrderRequestDto requestDto);
        public Task<OrderResponseDto> CreateOrder(long customerId, OrderRequestDto requestDto);
        public Task<DeleteEntityResponseDto> RefundOrder(long orderId, long customerId);
        public Task<DeleteEntityResponseDto> CancelOrder(long orderId, long customerId);
    }
}
