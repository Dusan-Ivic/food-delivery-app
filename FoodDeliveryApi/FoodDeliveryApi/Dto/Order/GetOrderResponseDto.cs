namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderResponseDto : BaseOrderDto<OrderItemResponseDto>
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
