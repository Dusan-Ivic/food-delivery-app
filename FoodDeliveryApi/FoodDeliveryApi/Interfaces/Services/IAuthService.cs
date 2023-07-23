using FoodDeliveryApi.Dto.Auth;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto requestDto);
    }
}
