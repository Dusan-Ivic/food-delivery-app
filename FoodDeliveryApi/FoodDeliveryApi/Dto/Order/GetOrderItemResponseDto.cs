using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderItemResponseDto : OrderItemResponseDto
    {
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
    }
}
