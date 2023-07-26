using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IProductRepository
    {
        public Task<Product> CreateProduct(Product product);
    }
}
