﻿using FoodDeliveryServer.Common.Dto.User;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Common.Dto.Partner
{
    public class PartnerResponseDto : UserResponseDto
    {
        public PartnerStatus Status { get; set; }
    }
}
