using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Auth
{
    public class LoginUserRequestDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserType UserType { get; set; }
    }
}
