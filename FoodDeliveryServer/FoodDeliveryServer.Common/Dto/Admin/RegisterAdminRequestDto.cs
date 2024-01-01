using FoodDeliveryServer.Common.Dto.User;

namespace FoodDeliveryServer.Common.Dto.Admin
{
    public class RegisterAdminRequestDto : AdminRequestDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
