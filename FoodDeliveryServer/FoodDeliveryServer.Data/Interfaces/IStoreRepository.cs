using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Data.Interfaces
{
    public interface IStoreRepository
    {
        public Task<List<Store>> GetAllStores();
        public Task<List<Store>> GetStoresByCategory(string category);
        public Task<List<Store>> GetStoresByCity(string city);
        public Task<Store?> GetStoreById(long id);
        public Task<Store> CreateStore(Store store);
        public Task<Store> UpdateStore(Store store);
        public Task DeleteStore(Store store);
    }
}
