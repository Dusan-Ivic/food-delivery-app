using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Repositories
{
    public class PartnerRepository : IPartnerRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public PartnerRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Partner>> GetAllPartners()
        {
            return await _dbContext.Partners.ToListAsync();
        }

        public async Task<Partner?> GetPartnerById(long id)
        {
            return await _dbContext.Partners.FindAsync(id);
        }

        public async Task<List<Partner>> GetPartnersByStatus(PartnerStatus status)
        {
            return await _dbContext.Partners.Where(x => x.Status == status).ToListAsync();
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

        public async Task<Partner> UpdatePartner(Partner partner)
        {
            try
            {
                _dbContext.Entry(partner).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return partner;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeletePartner(Partner partner)
        {
            try
            {
                _dbContext.Partners.Remove(partner);
                await _dbContext.SaveChangesAsync();
                return;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
