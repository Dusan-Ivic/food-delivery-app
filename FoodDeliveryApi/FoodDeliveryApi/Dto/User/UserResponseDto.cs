﻿using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Dto.User
{
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
