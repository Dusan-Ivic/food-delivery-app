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
