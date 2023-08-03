using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Auth
{
    public class DeleteTokenRequestDto
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
