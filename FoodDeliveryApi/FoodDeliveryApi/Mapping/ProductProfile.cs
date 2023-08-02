using AutoMapper;
using FoodDeliveryApi.Dto.Auth;
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

            CreateMap<Product, DeleteProductResponseDto>();

            CreateMap<Product, ImageResponseDto>();
        }
    }
}
