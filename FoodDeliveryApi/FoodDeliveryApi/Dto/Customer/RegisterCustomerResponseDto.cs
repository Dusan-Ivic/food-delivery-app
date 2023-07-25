using FoodDeliveryApi.Dto.User;

namespace FoodDeliveryApi.Dto.Customer
{
    public class RegisterCustomerResponseDto : RegisterUserResponseDto
    {
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
    }
}
