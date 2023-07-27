namespace FoodDeliveryApi.Models
{
    public class OrderItem
    {
        public long ProductId { get; set; }
        public Product Product { get; set; } = default!;
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public long OrderId { get; set; }
        public Order Order { get; set; } = default!;
    }
}
