using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Auth
{
    public class LoginUserResponseDto
    {
        public long Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public UserType UserType { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
