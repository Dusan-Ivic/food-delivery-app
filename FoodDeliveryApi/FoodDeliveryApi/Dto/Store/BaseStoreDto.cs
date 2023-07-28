using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Dto.Store
{
    public class BaseStoreDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DeliveryOptions DeliveryOptions { get; set; } = default!;
        public List<string> Categories { get; set; } = new List<string>();
    }
}
