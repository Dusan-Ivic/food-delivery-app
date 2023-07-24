using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Partner
{
    public class GetPartnerResponseDto : BaseUserDto
    {
        public long Id { get; set; }
        public PartnerStatus Status { get; set; }

    }
}
