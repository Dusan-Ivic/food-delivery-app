using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Interfaces.Repositories
{
    public interface ICustomerRepository
    {
        public Task<bool> IsEmailTaken(string email);
        public Task<bool> IsUsernameTaken(string username);
        public Task<List<Customer>> GetAllCustomers();
        public Task<Customer?> GetCustomerById(long id);
        public Task<Customer> RegisterCustomer(Customer customer);
        public Task<Customer> UpdateCustomer(Customer customer);
        public Task DeleteCustomer(Customer customer);
    }
}
