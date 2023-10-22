﻿using FoodDeliveryServer.Api.Enums;

namespace FoodDeliveryServer.Api.Dto.Auth
{
    public class TokenResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set;} = string.Empty;
        public long IssuedAt { get; set; }
        public int ExpiresIn { get; set; }
    }
}
