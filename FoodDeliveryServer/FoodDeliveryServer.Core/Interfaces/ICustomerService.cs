using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface ICustomerService
    {
        public Task<List<CustomerResponseDto>> GetCustomers();
        public Task<CustomerResponseDto> GetCustomer(long id);
        public Task<CustomerResponseDto> RegisterCustomer(RegisterUserRequestDto requestDto);
        public Task<CustomerResponseDto> UpdateCustomer(long id, UpdateUserRequestDto requestDto);
        public Task<DeleteEntityResponseDto> DeleteCustomer(long id);
    }
}
