using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface ICustomerRepository
    {
        public Task<bool> IsEmailTaken(string email);
        public Task<bool> IsUsernameTaken(string username);
        public Task<Customer> RegisterCustomer(Customer customer);
    }
}
