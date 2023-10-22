using FoodDeliveryServer.Api.Dto.Auth;
using FoodDeliveryServer.Api.Dto.User;
using FoodDeliveryServer.Api.Enums;

namespace FoodDeliveryServer.Api.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<UserResponseDto> GetProfile(long userId, UserType userType);
        public Task<TokenResponseDto> GenerateToken(CreateTokenRequestDto requestDto);
        public Task DeleteToken(long userId, UserType userType, DeleteTokenRequestDto requestDto);
        public Task ChangePassword(long id, UserType userType, ChangePasswordRequestDto requestDto);
        public Task<ImageResponseDto> UploadImage(long id, UserType userType, IFormFile image);
        public Task<ImageResponseDto> GetImage(long userId, UserType userType);
        public Task RemoveImage(long userId, UserType userType);
    }
}
