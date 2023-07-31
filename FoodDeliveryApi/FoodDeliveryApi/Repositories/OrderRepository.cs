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
            return await _dbContext.Orders.Include(x => x.Store).Include(x => x.Items).ThenInclude(x => x.Product).ToListAsync();
        }

        public async Task<List<Order>> GetOrdersByCustomer(long customerId)
        {
            return await _dbContext.Orders.Include(x => x.Store).Include(x => x.Items).ThenInclude(x => x.Product).Where(x => x.CustomerId == customerId).ToListAsync();
        }

        public async Task<List<Order>> GetOrdersByPartner(long partnerId)
        {
            return await _dbContext.Orders.Include(x => x.Store).Include(x => x.Items).ThenInclude(x => x.Product).Where(x => x.Store.PartnerId == partnerId).ToListAsync();
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
