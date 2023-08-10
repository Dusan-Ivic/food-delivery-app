using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Enums;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IStoreService
    {
        public Task<List<GetStoreResponseDto>> GetStores(long? partnerId, string? city);
        public Task<GetStoreResponseDto> GetStore(long id);
        public Task<CreateStoreResponseDto> CreateStore(long partnerId, CreateStoreRequestDto requestDto);
        public Task<UpdateStoreResponseDto> UpdateStore(long id, long partnerId, UpdateStoreRequestDto requestDto);
        public Task<DeleteStoreResponseDto> DeleteStore(long id);
        public Task<ImageResponseDto> UploadImage(long storeId, long partnerId, IFormFile image);
    }
}
