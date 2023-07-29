using FoodDeliveryApi.Dto.User;

namespace FoodDeliveryApi.Dto.Customer
{
    public class RegisterCustomerRequestDto : CustomerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
