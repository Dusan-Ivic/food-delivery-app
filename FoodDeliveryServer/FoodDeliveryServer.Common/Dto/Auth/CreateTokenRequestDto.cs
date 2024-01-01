using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Auth
{
    public class CreateTokenRequestDto
    {
        public GrantType GrantType { get; set; }
        public UserType? UserType { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? RefreshToken { get; set; }
    }
}
