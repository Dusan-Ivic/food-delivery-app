using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Auth
{
    public class DeleteTokenRequestDto
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
