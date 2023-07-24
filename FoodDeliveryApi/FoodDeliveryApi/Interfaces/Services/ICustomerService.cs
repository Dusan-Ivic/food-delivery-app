using FoodDeliveryApi.Dto.Customer;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface ICustomerService
    {
        public Task<RegisterCustomerResponseDto> RegisterCustomer(RegisterCustomerRequestDto requestDto);
    }
}
