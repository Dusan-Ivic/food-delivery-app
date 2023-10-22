using FoodDeliveryServer.Api.Dto.User;

namespace FoodDeliveryServer.Api.Dto.Customer
{
    public class RegisterCustomerRequestDto : CustomerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
