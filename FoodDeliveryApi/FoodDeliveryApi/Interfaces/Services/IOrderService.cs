using FoodDeliveryApi.Dto.Order;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<CreateOrderResponseDto> CreateOrder(long customerId, CreateOrderRequestDto requestDto);
    }
}
