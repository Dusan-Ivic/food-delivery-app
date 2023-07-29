using FoodDeliveryApi.Converters;
using FoodDeliveryApi.Enums;
using System.Text.Json.Serialization;

namespace FoodDeliveryApi.Dto.User
{
    [JsonConverter(typeof(UserResponseDtoConverter))]
    public class UserResponseDto
    {
        public long Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public UserType UserType { get; set; }
    }
}
