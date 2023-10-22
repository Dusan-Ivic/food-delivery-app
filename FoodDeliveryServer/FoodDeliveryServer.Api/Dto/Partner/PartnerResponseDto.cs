using FoodDeliveryServer.Api.Dto.User;
using FoodDeliveryServer.Api.Enums;

namespace FoodDeliveryServer.Api.Dto.Partner
{
    public class PartnerResponseDto : UserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
