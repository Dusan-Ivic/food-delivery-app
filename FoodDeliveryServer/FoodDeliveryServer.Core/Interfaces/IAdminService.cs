using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IAdminService
    {
        public Task<AdminResponseDto> RegisterAdmin(RegisterUserRequestDto requestDto);
        public Task<AdminResponseDto> UpdateAdmin(long id, UpdateUserRequestDto requestDto);
    }
}
