using FoodDeliveryServer.Common.Dto.Shared;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Response
{
    public class OrderResponseDto
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public decimal ItemsPrice { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal TotalPrice { get; set; }
        public StoreResponseDto Store { get; set; } = default!;
        public OrderStatus OrderStatus { get; set; }
        public long StoreId { get; set; }
        public List<OrderItemResponseDto> Items { get; set; } = default!;
        public string Address { get; set; } = string.Empty;
        public CoordinateDto Coordinate { get; set; } = default!;
        public string PaymentIntentId { get; set; } = string.Empty;
    }
}
