using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface ICustomerService
    {
        public Task<List<UserResponseDto>> GetCustomers();
        public Task<UserResponseDto> GetCustomer(long id);
        public Task<UserResponseDto> RegisterCustomer(RegisterUserRequestDto requestDto);
        public Task<UserResponseDto> UpdateCustomer(long id, UpdateUserRequestDto requestDto);
        public Task<DeleteEntityResponseDto> DeleteCustomer(long id);
    }
}
