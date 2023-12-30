namespace FoodDeliveryServer.Common.Dto.Request
{
    public class CreateProductRequestDto
    {
        public long StoreId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
