using FoodDeliveryServer.Common.Dto.Shared;

namespace FoodDeliveryServer.Common.Dto.Request
{
    public class OrderRequestDto
    {
        public long StoreId { get; set; }
        public List<OrderItemRequestDto> Items { get; set; } = default!;
        public string Address { get; set; } = string.Empty;
        public CoordinateDto Coordinate { get; set; } = default!;
        public string PaymentIntentId { get; set; } = string.Empty;
    }
}
