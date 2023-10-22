using FoodDeliveryServer.Common.Dto.Product;

namespace FoodDeliveryServer.Common.Dto.Order
{
    public class BaseOrderItemDto
    {
        public long ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderItemRequestDto : BaseOrderItemDto
    {
        
    }

    public class OrderItemResponseDto : BaseOrderItemDto
    {
        public decimal TotalPrice { get; set; }
        public long OrderId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
    }
}
