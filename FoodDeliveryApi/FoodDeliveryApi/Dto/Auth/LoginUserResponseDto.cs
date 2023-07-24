using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Auth
{
    public class LoginUserResponseDto : BaseUserDto
    {
        public long Id { get; set; }
        public UserType UserType { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
