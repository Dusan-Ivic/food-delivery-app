namespace FoodDeliveryServer.Common.Dto.Store
{
    public class UpdateStoreResponseDto : BaseStoreDto
    {
        public long Id { get; set; }
        public long PartnerId { get; set; }
        public string? Image { get; set; }
    }
}
