namespace FoodDeliveryApi.Dto.Order
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
    }
}
