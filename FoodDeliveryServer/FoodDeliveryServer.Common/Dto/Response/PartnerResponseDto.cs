using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Response
{
    public class PartnerResponseDto : UserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
