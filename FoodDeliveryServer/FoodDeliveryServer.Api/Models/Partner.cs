using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Api.Models
{
    public class Partner : User
    {
        public PartnerStatus Status { get; set; }
        public List<Store> Stores { get; set; } = new List<Store>();
    }
}
