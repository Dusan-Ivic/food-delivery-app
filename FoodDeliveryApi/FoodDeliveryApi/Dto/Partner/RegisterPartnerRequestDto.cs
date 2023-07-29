using FoodDeliveryApi.Dto.User;

namespace FoodDeliveryApi.Dto.Partner
{
    public class RegisterPartnerRequestDto : PartnerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
