using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Data.Models
{
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
        public int DeliveryTimeInMinutes { get; set; }
        public decimal DeliveryFee { get; set; } = decimal.Zero;
        public string Category { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string? ImagePublicId { get; set; }
        public Polygon DeliveryArea { get; set; } = default!;
        public List<Coordinate> Coordinates { get; set; } = default!;
    }
}
