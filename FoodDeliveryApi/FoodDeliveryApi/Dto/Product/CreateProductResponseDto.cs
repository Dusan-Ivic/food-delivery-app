namespace FoodDeliveryApi.Dto.Product
{
    public class CreateProductResponseDto : BaseProductDto
    {
        public long Id { get; set; }
        public long StoreId { get; set; }
        public byte[] ImageData { get; set; } = default!;
    }
}
