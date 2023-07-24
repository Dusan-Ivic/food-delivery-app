using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Models
{
    public class Partner : User
    {
        public PartnerStatus Status { get; set; }
    }
}
