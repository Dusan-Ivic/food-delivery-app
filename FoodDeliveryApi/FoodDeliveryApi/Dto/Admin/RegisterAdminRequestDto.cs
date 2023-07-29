using FoodDeliveryApi.Dto.User;

namespace FoodDeliveryApi.Dto.Admin
{
    public class RegisterAdminRequestDto : AdminRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
