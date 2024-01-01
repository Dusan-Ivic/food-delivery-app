namespace FoodDeliveryServer.Common.Dto.Product
{
    public class CreateProductResponseDto : BaseProductDto
    {
        public long Id { get; set; }
        public long StoreId { get; set; }
        public string? Image { get; set; }
    }
}
