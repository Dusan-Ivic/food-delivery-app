using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.Partner
{
    public class UpdatePartnerResponseDto : UpdateUserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
