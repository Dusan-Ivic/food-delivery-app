using AutoMapper;
using FoodDeliveryApi.Dto.Product;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<CreateProductRequestDto, Product>();
            CreateMap<Product, CreateProductResponseDto>();

            CreateMap<Product, GetProductResponseDto>();

            CreateMap<UpdateProductRequestDto, Product>();
            CreateMap<Product, UpdateProductResponseDto>();
        }
    }
}
