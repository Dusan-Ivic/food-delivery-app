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
            return await _dbContext.Orders.ToListAsync();
        }

        public async Task<List<Order>> GetOrdersByCustomer(long customerId)
        {
            return await _dbContext.Orders.Where(x => x.CustomerId == customerId).ToListAsync();
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
