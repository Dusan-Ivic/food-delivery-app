namespace FoodDeliveryApi.Dto.User
{
    public class RegisterUserRequestDto : BaseUserDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
