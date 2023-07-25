using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IStoreRepository
    {
        public Task<Store> CreateStore(Store store);
    }
}
