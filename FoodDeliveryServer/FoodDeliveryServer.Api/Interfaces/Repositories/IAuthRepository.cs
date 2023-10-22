using FoodDeliveryServer.Api.Enums;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        public Task<User?> GetUserByUsername(string username, UserType type);
        public Task<User?> GetUserById(long id, UserType type);
        public Task<User> UpdateUser(User user);
        public Task<RefreshToken> CreateRefreshToken(RefreshToken refreshToken);
        public Task<RefreshToken?> GetRefreshToken(string token);
        public Task<RefreshToken?> GetRefreshTokenByUser(long userId);
        public Task DeleteRefreshToken(RefreshToken refreshToken);
        public Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken);
    }
}
