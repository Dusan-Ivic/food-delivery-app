using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public AuthRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RefreshToken> CreateRefreshToken(RefreshToken refreshToken)
        {
            await _dbContext.RefreshTokens.AddAsync(refreshToken);
            await _dbContext.SaveChangesAsync();
            return refreshToken;
        }

        public async Task DeleteRefreshToken(RefreshToken refreshToken)
        {
            _dbContext.RefreshTokens.Remove(refreshToken);
            await _dbContext.SaveChangesAsync();
            return;
        }

        public async Task<RefreshToken?> GetRefreshToken(string token)
        {
            return await _dbContext.RefreshTokens.FirstOrDefaultAsync(x => x.Token == token);
        }

        public async Task<RefreshToken?> GetRefreshTokenByUser(long userId)
        {
            return await _dbContext.RefreshTokens.FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<User?> GetUserById(long id, UserType userType)
        {
            switch (userType)
            {
                case UserType.Customer:
                    return await _dbContext.Customers.FindAsync(id);
                case UserType.Partner:
                    return await _dbContext.Partners.FindAsync(id);
                case UserType.Admin:
                    return await _dbContext.Admins.FindAsync(id);
                default:
                    throw new ArgumentException("Invalid user type");
            }
        }

        public async Task<User?> GetUserByUsername(string username, UserType userType)
        {
            switch(userType)
            {
                case UserType.Customer:
                    return await _dbContext.Customers.Where(x => x.Username == username).FirstOrDefaultAsync();
                case UserType.Partner:
                    return await _dbContext.Partners.Where(x => x.Username == username).FirstOrDefaultAsync();
                case UserType.Admin:
                    return await _dbContext.Admins.Where(x => x.Username == username).FirstOrDefaultAsync();
                default:
                    throw new ArgumentException("Invalid user type");
            }
        }

        public async Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken)
        {
            _dbContext.Entry(refreshToken).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return refreshToken;
        }

        public async Task<User> UpdateUser(User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return user;
        }
    }
}
