namespace FoodDeliveryApi.Models
{
    public class DeliveryOptions
    {
        public int DeliveryTimeInMinutes { get; set; }
        public decimal DeliveryFee { get; set; } = decimal.Zero;
        public decimal MinimumOrderAmount { get; set; } = decimal.Zero;
    }

    public class Store
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public long PartnerId { get; set; }
        public Partner Partner { get; set; } = default!;
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Order> Orders { get; set; } = new List<Order>();
        public DeliveryOptions DeliveryOptions { get; set; } = default!;
    }
}
