using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.User;
using FoodDeliveryServer.Common.Enums;
using Microsoft.AspNetCore.Http;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IAuthService
    {
        public Task<UserResponseDto> GetProfile(long userId, UserType userType);
        public Task<TokenResponseDto> GenerateToken(CreateTokenRequestDto requestDto);
        public Task DeleteToken(long userId, UserType userType, DeleteTokenRequestDto requestDto);
        public Task ChangePassword(long id, UserType userType, ChangePasswordRequestDto requestDto);
        public Task<ImageResponseDto> UploadImage(long id, UserType userType, Stream imageStream, string imageName);
        public Task RemoveImage(long userId, UserType userType);
    }
}
