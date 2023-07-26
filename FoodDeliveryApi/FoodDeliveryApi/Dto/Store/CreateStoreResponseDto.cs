namespace FoodDeliveryApi.Dto.Store
{
    public class CreateStoreResponseDto : BaseStoreDto
    {
        public long Id { get; set; }
        public long PartnerId { get; set; }
    }
}
