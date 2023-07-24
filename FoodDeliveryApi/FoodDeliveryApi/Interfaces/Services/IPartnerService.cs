using FoodDeliveryApi.Dto.Partner;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IPartnerService
    {
        public Task<RegisterPartnerResponseDto> RegisterPartner(RegisterPartnerRequestDto requestDto);
    }
}
