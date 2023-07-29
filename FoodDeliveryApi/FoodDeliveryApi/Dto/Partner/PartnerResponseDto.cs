using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Partner
{
    public class PartnerResponseDto : UserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
