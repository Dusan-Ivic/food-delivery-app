namespace FoodDeliveryApi.Dto.Product
{
    public class UpdateProductResponseDto : BaseProductDto
    {
        public long Id { get; set; }
        public long StoreId { get; set; }
    }
}
