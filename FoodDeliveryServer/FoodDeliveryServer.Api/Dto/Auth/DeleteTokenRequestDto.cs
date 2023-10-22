using FoodDeliveryServer.Api.Enums;

namespace FoodDeliveryServer.Api.Dto.Auth
{
    public class DeleteTokenRequestDto
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
