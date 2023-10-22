namespace FoodDeliveryServer.Common.Dto.Product
{
    public class CreateProductRequestDto : BaseProductDto
    {
        public long StoreId { get; set; }
    }
}
