namespace FoodDeliveryApi.Dto.Store
{
    public class GetStoreResponseDto : BaseStoreDto
    {
        public long Id { get; set; }
        public long PartnerId { get; set; }
        public byte[] ImageData { get; set; } = default!;
    }
}
