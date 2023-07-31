using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public GetProductResponseDto Product { get; set; } = default!;
    }
}
