using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IStoreService
    {
        public Task<List<StoreResponseDto>> GetStores(long? partnerId, double? latitude, double? longitude);
        public Task<StoreResponseDto> GetStore(long id);
        public Task<StoreResponseDto> CreateStore(long partnerId, StoreRequestDto requestDto);
        public Task<StoreResponseDto> UpdateStore(long id, long partnerId, StoreRequestDto requestDto);
        public Task<DeleteEntityResponseDto> DeleteStore(long id);
        public Task<ImageResponseDto> UploadImage(long storeId, long partnerId, Stream imageStream, string imageName);
    }
}
