namespace FoodDeliveryServer.Common.Dto.Response
{
    public class ProductResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public long StoreId { get; set; }
        public string? Image { get; set; }
    }
}
