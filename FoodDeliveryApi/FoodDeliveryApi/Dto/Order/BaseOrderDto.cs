namespace FoodDeliveryApi.Dto.Order
{
    public class BaseOrderDto<T>
    {
        public long StoreId { get; set; }
        public List<T> Items { get; set; } = new List<T>();
    }
}
