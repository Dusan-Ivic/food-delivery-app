using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        public Task<User?> GetUserByUsername(string username, UserType type);
        public Task<User?> GetUserById(long id, UserType type);
        public Task<User> UpdateUser(User user);
    }
}
