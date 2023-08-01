namespace FoodDeliveryApi.Dto.Auth
{
    public class ImageResponseDto
    {
        public long Id { get; set; }
        public byte[] ImageData { get; set; } = default!;
    }
}
