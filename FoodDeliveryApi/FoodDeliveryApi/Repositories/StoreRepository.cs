using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public StoreRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Store> CreateStore(Store store)
        {
            try
            {
                await _dbContext.Stores.AddAsync(store);
                await _dbContext.SaveChangesAsync();
                return store;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
