using FoodDeliveryServer.Common.Dto.User;

namespace FoodDeliveryServer.Common.Dto.Partner
{
    public class RegisterPartnerRequestDto : PartnerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
