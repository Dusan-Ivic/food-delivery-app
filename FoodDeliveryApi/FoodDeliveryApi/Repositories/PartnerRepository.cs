using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Repositories
{
    public class PartnerRepository : IPartnerRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public PartnerRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> IsEmailTaken(string email)
        {
            try
            {
                return await _dbContext.Partners.AnyAsync(x => x.Email == email);
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
                return await _dbContext.Partners.AnyAsync(x => x.Username == username);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Partner> RegisterPartner(Partner partner)
        {
            try
            {
                await _dbContext.Partners.AddAsync(partner);
                await _dbContext.SaveChangesAsync();
                return partner;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
