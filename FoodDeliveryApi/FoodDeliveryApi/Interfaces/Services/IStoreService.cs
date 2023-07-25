using FoodDeliveryApi.Dto.Store;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IStoreService
    {
        public Task<CreateStoreResponseDto> CreateStore(long partnerId, CreateStoreRequestDto requestDto);
    }
}
