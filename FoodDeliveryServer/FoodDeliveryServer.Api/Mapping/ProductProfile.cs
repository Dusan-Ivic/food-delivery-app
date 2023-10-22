using AutoMapper;
using FoodDeliveryServer.Api.Dto.Auth;
using FoodDeliveryServer.Api.Dto.Product;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Mapping
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
