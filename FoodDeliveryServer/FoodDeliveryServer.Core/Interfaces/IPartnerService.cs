using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IPartnerService
    {
        public Task<List<PartnerResponseDto>> GetPartners(string status);
        public Task<PartnerResponseDto> GetPartner(long id);
        public Task<PartnerResponseDto> RegisterPartner(RegisterUserRequestDto requestDto);
        public Task<PartnerResponseDto> UpdatePartner(long id, UpdateUserRequestDto requestDto);
        public Task<DeleteEntityResponseDto> DeletePartner(long id);
        public Task<PartnerResponseDto> VerifyPartner(long id, VerifyPartnerRequestDto requestDto);
    }
}
