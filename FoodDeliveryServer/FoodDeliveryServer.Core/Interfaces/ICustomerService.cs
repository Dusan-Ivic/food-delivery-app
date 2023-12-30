using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Request;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface ICustomerService
    {
        public Task<List<GetCustomerResponseDto>> GetCustomers();
        public Task<GetCustomerResponseDto> GetCustomer(long id);
        public Task<RegisterCustomerResponseDto> RegisterCustomer(RegisterUserRequestDto requestDto);
        public Task<UpdateCustomerResponseDto> UpdateCustomer(long id, UpdateUserRequestDto requestDto);
        public Task<DeleteCustomerResponseDto> DeleteCustomer(long id);
    }
}
