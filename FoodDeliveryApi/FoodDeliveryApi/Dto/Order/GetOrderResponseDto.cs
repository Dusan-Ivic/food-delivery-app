﻿namespace FoodDeliveryApi.Dto.Order
{
    public class GetOrderResponseDto : BaseOrderDto<OrderItemResponseDto>
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = default!;
        public long CustomerId { get; set; }
        public decimal ItemsPrice { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal TotalPrice { get; set; }
    }
}