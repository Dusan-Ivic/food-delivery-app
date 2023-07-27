using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> CreateOrder(Order order);
    }
}
