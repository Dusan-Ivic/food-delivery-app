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
            return await _dbContext.Partners.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            return await _dbContext.Partners.AnyAsync(x => x.Username == username);
        }

        public async Task<Partner> RegisterPartner(Partner partner)
        {
            await _dbContext.Partners.AddAsync(partner);
            await _dbContext.SaveChangesAsync();
            return partner;
        }

        public async Task<Partner> UpdatePartner(Partner partner)
        {
            _dbContext.Entry(partner).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return partner;
        }

        public async Task DeletePartner(Partner partner)
        {
            _dbContext.Partners.Remove(partner);
            await _dbContext.SaveChangesAsync();
            return;
        }
    }
}
