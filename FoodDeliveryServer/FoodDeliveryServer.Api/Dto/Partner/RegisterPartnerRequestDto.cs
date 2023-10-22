using FoodDeliveryServer.Api.Dto.User;

namespace FoodDeliveryServer.Api.Dto.Partner
{
    public class RegisterPartnerRequestDto : PartnerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
