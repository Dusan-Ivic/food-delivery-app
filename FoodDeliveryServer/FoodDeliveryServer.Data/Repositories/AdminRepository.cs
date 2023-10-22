using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Repositories
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

        public async Task<Admin?> GetAdminById(long id)
        {
            return await _dbContext.Admins.FindAsync(id);
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

        public async Task<Admin> UpdateAdmin(Admin admin)
        {
            try
            {
                _dbContext.Entry(admin).State = EntityState.Modified;
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
