using FoodDeliveryServer.Common.Dto.Store;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Order
{
    public class GetOrderResponseDto : BaseOrderDto<GetOrderItemResponseDto>
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public decimal ItemsPrice { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal TotalPrice { get; set; }
        public GetStoreResponseDto Store { get; set; } = default!;
        public OrderStatus OrderStatus { get; set; }
    }
}
