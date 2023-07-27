namespace FoodDeliveryApi.Models
{
    public class OrderItem
    {
        public long ProductId { get; set; }
        public Product Product { get; set; } = default!;
        public long OrderId { get; set; }
        public Order Order { get; set; } = default!;
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class Order
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public Customer Customer { get; set; } = default!;
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
