using FoodDeliveryServer.Common.Dto.Admin;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IAdminService
    {
        public Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto);
        public Task<UpdateAdminResponseDto> UpdateAdmin(long id, UpdateAdminRequestDto requestDto);
    }
}
