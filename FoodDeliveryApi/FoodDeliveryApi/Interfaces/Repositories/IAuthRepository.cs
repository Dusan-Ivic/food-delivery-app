using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        public Task<User?> GetUser(string username, UserType type);
    }
}
