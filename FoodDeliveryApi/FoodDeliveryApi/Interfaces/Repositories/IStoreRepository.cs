using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IStoreRepository
    {
        public Task<List<Store>> GetAllStores();
        public Task<Store?> GetStoreById(long id);
        public Task<Store> CreateStore(Store store);
        public Task<Store> UpdateStore(Store store);
        public Task DeleteStore(Store store);
    }
}
