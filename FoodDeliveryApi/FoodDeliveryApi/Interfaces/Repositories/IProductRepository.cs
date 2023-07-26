using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetAllProducts();
        public Task<List<Product>> GetProductsByStore(long storeId);
        public Task<Product?> GetProductById(long id);
        public Task<Product> CreateProduct(Product product);
    }
}
