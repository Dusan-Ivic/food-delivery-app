using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto requestDto);
        public Task ChangePassword(long id, UserType userType, ChangePasswordRequestDto requestDto);
        public Task<ImageResponseDto> UploadImage(long id, UserType userType, IFormFile image);
        public Task<ImageResponseDto> GetImage(long userId, UserType userType);
    }
}
