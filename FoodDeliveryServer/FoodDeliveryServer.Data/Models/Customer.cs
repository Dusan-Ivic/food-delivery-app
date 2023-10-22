namespace FoodDeliveryServer.Data.Models
{
    public class Customer : User
    {
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
