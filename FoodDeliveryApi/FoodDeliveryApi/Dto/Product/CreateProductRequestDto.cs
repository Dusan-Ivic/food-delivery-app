namespace FoodDeliveryApi.Dto.Product
{
    public class CreateProductRequestDto : BaseProductDto
    {
        public long StoreId { get; set; }
    }
}
