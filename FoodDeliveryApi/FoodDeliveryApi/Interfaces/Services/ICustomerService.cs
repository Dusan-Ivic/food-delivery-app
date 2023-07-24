using FoodDeliveryApi.Dto.Customer;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface ICustomerService
    {
        public Task<List<GetCustomerResponseDto>> GetCustomers();
        public Task<GetCustomerResponseDto> GetCustomer(long id);
        public Task<RegisterCustomerResponseDto> RegisterCustomer(RegisterCustomerRequestDto requestDto);
    }
}
