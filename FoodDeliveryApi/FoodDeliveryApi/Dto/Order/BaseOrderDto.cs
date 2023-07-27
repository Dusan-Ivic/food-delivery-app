namespace FoodDeliveryApi.Dto.Order
{
    public class BaseOrderDto<T>
    {
        public List<T> Items { get; set; } = new List<T>();
    }
}
