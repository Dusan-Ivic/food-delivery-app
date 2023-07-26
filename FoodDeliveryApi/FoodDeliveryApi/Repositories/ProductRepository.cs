using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public ProductRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Product> CreateProduct(Product product)
        {
            try
            {
                await _dbContext.Products.AddAsync(product);
                await _dbContext.SaveChangesAsync();
                return product;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
