using FoodDeliveryServer.Api.Enums;

namespace FoodDeliveryServer.Api.Models
{
    public class RefreshToken
    {
        public long Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public long UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserType UserType { get; set; }
    }
}
