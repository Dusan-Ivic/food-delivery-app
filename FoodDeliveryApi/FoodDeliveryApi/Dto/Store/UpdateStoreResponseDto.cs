﻿namespace FoodDeliveryApi.Dto.Store
{
    public class UpdateStoreResponseDto : BaseStoreDto
    {
        public long Id { get; set; }
        public long PartnerId { get; set; }
        public byte[] ImageData { get; set; } = default!;
    }
}
