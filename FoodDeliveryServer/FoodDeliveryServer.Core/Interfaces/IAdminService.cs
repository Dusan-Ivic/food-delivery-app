using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Common.Dto.Request;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IAdminService
    {
        public Task<RegisterAdminResponseDto> RegisterAdmin(RegisterUserRequestDto requestDto);
        public Task<UpdateAdminResponseDto> UpdateAdmin(long id, UpdateUserRequestDto requestDto);
    }
}
