using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public string? ProductImage { get; set; }
    }
}
