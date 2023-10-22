using FoodDeliveryServer.Api.Dto.Product;

namespace FoodDeliveryServer.Api.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public string? ProductImage { get; set; }
    }
}
