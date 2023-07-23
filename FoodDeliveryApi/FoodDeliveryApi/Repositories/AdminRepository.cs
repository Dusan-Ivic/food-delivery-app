using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public AdminRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> IsEmailTaken(string email)
        {
            try
            {
                return await _dbContext.Admins.AnyAsync(x => x.Email == email);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            try
            {
                return await _dbContext.Admins.AnyAsync(x => x.Username == username);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Admin> RegisterAdmin(Admin admin)
        {
            try
            {
                await _dbContext.Admins.AddAsync(admin);
                await _dbContext.SaveChangesAsync();
                return admin;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
