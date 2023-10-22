using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Data.Models
{
    public class Partner : User
    {
        public PartnerStatus Status { get; set; }
        public List<Store> Stores { get; set; } = new List<Store>();
    }
}
