using FoodDeliveryServer.Api.Dto.User;
using FoodDeliveryServer.Api.Enums;
using System.Text.Json.Serialization;

namespace FoodDeliveryServer.Api.Dto.Auth
{
    public class LoginUserResponseDto
    {
        public UserResponseDto User { get; set; } = default!;
        public string Token { get; set; } = string.Empty;
    }
}
