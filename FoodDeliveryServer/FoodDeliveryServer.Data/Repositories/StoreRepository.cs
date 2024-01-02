using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public StoreRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Store>> GetAllStores()
        {
            return await _dbContext.Stores.ToListAsync();
        }

        public async Task<List<Store>> GetStoresByCategory(string category)
        {
            List<Store> allStores = await GetAllStores();

            return allStores.Where(x => x.Category.ToLower() == category.ToLower()).ToList();
        }

        public async Task<List<Store>> GetStoresByCity(string city)
        {
            return await _dbContext.Stores.Where(x => x.City.ToLower() == city.ToLower()).ToListAsync();
        }

        public async Task<Store?> GetStoreById(long id)
        {
            return await _dbContext.Stores.FindAsync(id);
        }

        public async Task<Store> CreateStore(Store store)
        {
            await _dbContext.Stores.AddAsync(store);
            await _dbContext.SaveChangesAsync();
            return store;
        }

        public async Task<Store> UpdateStore(Store store)
        {
            _dbContext.Entry(store).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return store;
        }

        public async Task DeleteStore(Store store)
        {
            _dbContext.Stores.Remove(store);
            await _dbContext.SaveChangesAsync();
            return;
        }
    }
}
