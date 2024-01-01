using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IProductService
    {
        public Task<List<ProductResponseDto>> GetProducts(long? storeId);
        public Task<ProductResponseDto> GetProduct(long id);
        public Task<ProductResponseDto> CreateProduct(long partnerId, CreateProductRequestDto requestDto);
        public Task<ProductResponseDto> UpdateProduct(long id, long partnerId, UpdateProductRequestDto requestDto);
        public Task<DeleteEntityResponseDto> DeleteProduct(long id, long partnerId);
        public Task<ImageResponseDto> UploadImage(long productId, long partnerId, Stream imageStream, string imageName);
    }
}
