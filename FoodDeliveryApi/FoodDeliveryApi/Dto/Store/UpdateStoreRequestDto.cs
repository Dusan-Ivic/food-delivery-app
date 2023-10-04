using FoodDeliveryApi.Dto.Geolocation;

namespace FoodDeliveryApi.Dto.Store
{
    public class UpdateStoreRequestDto : BaseStoreDto
    {
        public List<CoordinateDto> Coordinates { get; set; } = default!;
    }
}
