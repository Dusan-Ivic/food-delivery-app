using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Data.Interfaces
{
    public interface IOrderRepository
    {
        public Task<List<Order>> GetAllOrders();
        public Task<Order?> GetOrderById(long id);
        public Task<List<Order>> GetOrdersByCustomer(long customerId);
        public Task<List<Order>> GetOrdersByPartner(long partnerId);
        public Task<Order> CreateOrder(Order order);
        public Task<Order> UpdateOrder(Order order);
    }
}
