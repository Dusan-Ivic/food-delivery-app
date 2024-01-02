using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly FoodDeliveryDbContext _dbContext;

        public CustomerRepository(FoodDeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Customer>> GetAllCustomers()
        {
            return await _dbContext.Customers.ToListAsync();
        }

        public async Task<Customer?> GetCustomerById(long id)
        {
            return await _dbContext.Customers.FindAsync(id);
        }

        public async Task<bool> IsEmailTaken(string email)
        {
            return await _dbContext.Customers.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            return await _dbContext.Customers.AnyAsync(x => x.Username == username);
        }

        public async Task<Customer> RegisterCustomer(Customer customer)
        {
            await _dbContext.Customers.AddAsync(customer);
            await _dbContext.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            _dbContext.Entry(customer).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return customer;
        }

        public async Task DeleteCustomer(Customer customer)
        {
            _dbContext.Customers.Remove(customer);
            await _dbContext.SaveChangesAsync();
            return;
        }
    }
}
