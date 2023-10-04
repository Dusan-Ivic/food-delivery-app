using FoodDeliveryApi.Dto.Geolocation;

namespace FoodDeliveryApi.Dto.Store
{
    public class CreateStoreRequestDto : BaseStoreDto
    {
        public List<CoordinateDto> Coordinates { get; set; } = default!;
    }
}
