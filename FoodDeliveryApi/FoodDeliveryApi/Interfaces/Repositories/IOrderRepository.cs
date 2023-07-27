using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        public Task<List<Order>> GetAllOrders();
        public Task<List<Order>> GetOrdersByCustomer(long customerId);
        public Task<List<OrderItem>> GetOrderItemsByPartner(long partnerId);
        public Task<List<OrderItem>> GetOrderItemsByStore(long storeId);
        public Task<Order> CreateOrder(Order order);
    }
}
