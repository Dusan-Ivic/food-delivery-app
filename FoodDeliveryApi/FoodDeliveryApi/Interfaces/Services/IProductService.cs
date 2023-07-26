using FoodDeliveryApi.Dto.Product;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IProductService
    {
        public Task<CreateProductResponseDto> CreateProduct(long partnerId, CreateProductRequestDto requestDto);
    }
}
