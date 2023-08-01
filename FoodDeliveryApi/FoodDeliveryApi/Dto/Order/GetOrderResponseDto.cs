using FoodDeliveryApi.Dto.Store;

namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderResponseDto : BaseOrderDto<GetOrderItemResponseDto>
    {
        public long Id { get; set; }
        public bool IsCanceled { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public decimal ItemsPrice { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal TotalPrice { get; set; }
        public string StoreName { get; set; } = string.Empty;
    }
}
