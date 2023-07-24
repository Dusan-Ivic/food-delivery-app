using FoodDeliveryApi.Dto.Partner;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IPartnerService
    {
        public Task<List<GetPartnerResponseDto>> GetPartners(string status);
        public Task<GetPartnerResponseDto> GetPartner(long id);
        public Task<RegisterPartnerResponseDto> RegisterPartner(RegisterPartnerRequestDto requestDto);
    }
}
