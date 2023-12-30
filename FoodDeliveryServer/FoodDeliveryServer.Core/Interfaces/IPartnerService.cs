using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Dto.Request;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IPartnerService
    {
        public Task<List<GetPartnerResponseDto>> GetPartners(string status);
        public Task<GetPartnerResponseDto> GetPartner(long id);
        public Task<RegisterPartnerResponseDto> RegisterPartner(RegisterUserRequestDto requestDto);
        public Task<UpdatePartnerResponseDto> UpdatePartner(long id, UpdateUserRequestDto requestDto);
        public Task<DeletePartnerResponseDto> DeletePartner(long id);
        public Task<UpdatePartnerResponseDto> VerifyPartner(long id, VerifyPartnerRequestDto requestDto);
    }
}
