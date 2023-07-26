using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IProductService
    {
        public Task<List<GetProductResponseDto>> GetProducts(long? storeId);
        public Task<GetProductResponseDto> GetProduct(long id);
        public Task<CreateProductResponseDto> CreateProduct(long partnerId, CreateProductRequestDto requestDto);
    }
}
