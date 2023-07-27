using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public OrderRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _dbContext.Orders.Include(x => x.Items).ToListAsync();
        }

        public async Task<List<Order>> GetOrdersByCustomer(long customerId)
        {
            return await _dbContext.Orders.Include(x => x.Items).Where(x => x.CustomerId == customerId).ToListAsync();
        }

        public async Task<List<OrderItem>> GetOrderItemsByPartner(long partnerId)
        {
            return await _dbContext.OrderItems.Include(x => x.Product).ThenInclude(x => x.Store).Where(x => x.Product.Store.PartnerId == partnerId).ToListAsync();
        }

        public async Task<List<OrderItem>> GetOrderItemsByStore(long storeId)
        {
            return await _dbContext.OrderItems.Include(x => x.Product).Where(x => x.Product.StoreId == storeId).ToListAsync();
        }

        public async Task<Order> CreateOrder(Order order)
        {
            try
            {
                await _dbContext.Orders.AddAsync(order);
                await _dbContext.SaveChangesAsync();
                return order;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
