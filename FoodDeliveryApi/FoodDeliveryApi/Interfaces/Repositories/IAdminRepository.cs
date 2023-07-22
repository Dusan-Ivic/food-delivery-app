using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IAdminRepository
    {
        public Task<Admin> RegisterAdmin(Admin admin);
    }
}
