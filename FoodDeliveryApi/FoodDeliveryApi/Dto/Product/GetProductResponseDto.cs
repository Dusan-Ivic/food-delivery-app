namespace FoodDeliveryApi.Dto.Product
{
    public class GetProductResponseDto : BaseProductDto
    {
        public long Id { get; set; }
        public long StoreId { get; set; }
    }
}
