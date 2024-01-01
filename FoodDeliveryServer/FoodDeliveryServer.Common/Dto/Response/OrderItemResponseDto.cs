namespace FoodDeliveryServer.Common.Dto.Response
{
    public class OrderItemResponseDto
    {
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public long OrderId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
        public string? ProductImage { get; set; }
    }
}
