namespace FoodDeliveryServer.Data.Models
{
    public class Product
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public long StoreId { get; set; }
        public Store Store { get; set; } = default!;
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public string? Image { get; set; }
        public string? ImagePublicId { get; set; }
    }
}
