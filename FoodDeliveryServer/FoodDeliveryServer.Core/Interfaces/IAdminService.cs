using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IAdminService
    {
        public Task<UserResponseDto> RegisterAdmin(RegisterUserRequestDto requestDto);
        public Task<UserResponseDto> UpdateAdmin(long id, UpdateUserRequestDto requestDto);
    }
}
