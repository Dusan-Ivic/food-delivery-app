using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Partner
{
    public class RegisterPartnerResponseDto : RegisterUserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
