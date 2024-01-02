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
            return await _dbContext.Admins.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            return await _dbContext.Admins.AnyAsync(x => x.Username == username);
        }

        public async Task<Admin?> GetAdminById(long id)
        {
            return await _dbContext.Admins.FindAsync(id);
        }

        public async Task<Admin> RegisterAdmin(Admin admin)
        {
            await _dbContext.Admins.AddAsync(admin);
            await _dbContext.SaveChangesAsync();
            return admin;
        }

        public async Task<Admin> UpdateAdmin(Admin admin)
        {
            _dbContext.Entry(admin).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return admin;
        }
    }
}
