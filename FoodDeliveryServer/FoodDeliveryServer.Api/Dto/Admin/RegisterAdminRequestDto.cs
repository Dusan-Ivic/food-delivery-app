using FoodDeliveryServer.Api.Dto.User;

namespace FoodDeliveryServer.Api.Dto.Admin
{
    public class RegisterAdminRequestDto : AdminRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
