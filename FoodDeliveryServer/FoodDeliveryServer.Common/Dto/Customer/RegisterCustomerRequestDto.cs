using FoodDeliveryServer.Common.Dto.User;

namespace FoodDeliveryServer.Common.Dto.Customer
{
    public class RegisterCustomerRequestDto : CustomerRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
