using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Dto.Product;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<List<GetOrderResponseDto>> GetOrders(long userId, UserType userType);
        public Task<List<GetOrderItemResponseDto>> GetOrderItems(long partnerId, long? storeId);
        public Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto);
    }
}
