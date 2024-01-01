using FoodDeliveryServer.Common.Dto.User;
using FoodDeliveryServer.Common.Enums;
using System.Text.Json.Serialization;

namespace FoodDeliveryServer.Common.Dto.Auth
{
    public class LoginUserResponseDto
    {
        public UserResponseDto User { get; set; } = default!;
        public string Token { get; set; } = string.Empty;
    }
}
