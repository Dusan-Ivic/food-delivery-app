using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;
using System.Text.Json.Serialization;

namespace FoodDeliveryApi.Dto.Auth
{
    public class LoginUserResponseDto
    {
        public UserResponseDto User { get; set; } = default!;
        public string Token { get; set; } = string.Empty;
    }
}
