using FoodDeliveryServer.Common.Dto.Product;

namespace FoodDeliveryServer.Common.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public string? ProductImage { get; set; }
    }
}
