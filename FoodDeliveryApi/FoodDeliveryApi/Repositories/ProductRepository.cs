using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public ProductRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _dbContext.Products.ToListAsync();
        }

        public async Task<List<Product>> GetProductsByStore(long storeId)
        {
            return await _dbContext.Products.Where(x => x.StoreId == storeId).ToListAsync();
        }

        public async Task<Product?> GetProductById(long id)
        {
            return await _dbContext.Products.Include(x => x.Store).FirstOrDefaultAsync(x => x.Id == id);
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

        public async Task<Product> UpdateProduct(Product product)
        {
            try
            {
                _dbContext.Entry(product).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return product;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteProduct(Product product)
        {
            try
            {
                _dbContext.Products.Remove(product);
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
