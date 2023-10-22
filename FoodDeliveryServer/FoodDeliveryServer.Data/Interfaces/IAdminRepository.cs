using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Data.Interfaces
{
    public interface IAdminRepository
    {
        public Task<bool> IsEmailTaken(string email);
        public Task<bool> IsUsernameTaken(string username);
        public Task<Admin?> GetAdminById(long id);
        public Task<Admin> RegisterAdmin(Admin admin);
        public Task<Admin> UpdateAdmin(Admin admin);
    }
}
