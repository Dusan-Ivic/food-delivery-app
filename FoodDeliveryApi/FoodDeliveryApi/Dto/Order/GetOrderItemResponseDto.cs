using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public byte[] ProductImage { get; set; } = default!;
    }
}
