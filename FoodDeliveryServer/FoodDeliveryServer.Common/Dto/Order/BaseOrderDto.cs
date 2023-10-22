using FoodDeliveryServer.Common.Dto.Geolocation;

namespace FoodDeliveryServer.Common.Dto.Order
{
    public class BaseOrderDto<T>
    {
        public long StoreId { get; set; }
        public List<T> Items { get; set; } = new List<T>();
        public string Address { get; set; } = string.Empty;
        public CoordinateDto Coordinate { get; set; } = default!;
        public string PaymentIntentId { get; set; } = string.Empty;
    }
}
