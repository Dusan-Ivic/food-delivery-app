﻿using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Repositories
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
            try
            {
                return await _dbContext.Customers.AnyAsync(x => x.Email == email);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            try
            {
                return await _dbContext.Customers.AnyAsync(x => x.Username == username);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Customer> RegisterCustomer(Customer customer)
        {
            try
            {
                await _dbContext.Customers.AddAsync(customer);
                await _dbContext.SaveChangesAsync();
                return customer;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
