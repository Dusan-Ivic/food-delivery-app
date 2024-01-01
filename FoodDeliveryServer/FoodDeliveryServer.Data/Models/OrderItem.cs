namespace FoodDeliveryServer.Data.Models
{
    public class OrderItem
    {
        public long ProductId { get; set; }
        public Product Product { get; set; } = default!;
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public long OrderId { get; set; }
        public Order Order { get; set; } = default!;
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
        public string? ProductImage { get; set; }
        public string ProductDescription { get; set; } = string.Empty;

    }
}
