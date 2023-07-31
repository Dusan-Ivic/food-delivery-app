using FoodDeliveryApi.Dto.Store;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IStoreService
    {
        public Task<List<GetStoreResponseDto>> GetStores(long? partnerId);
        public Task<GetStoreResponseDto> GetStore(long id);
        public Task<CreateStoreResponseDto> CreateStore(long partnerId, CreateStoreRequestDto requestDto);
        public Task<UpdateStoreResponseDto> UpdateStore(long id, long partnerId, UpdateStoreRequestDto requestDto);
        public Task<DeleteStoreResponseDto> DeleteStore(long id);
    }
}
