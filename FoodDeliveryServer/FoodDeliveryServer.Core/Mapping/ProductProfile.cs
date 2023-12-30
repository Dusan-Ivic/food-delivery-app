using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<CreateProductRequestDto, Product>();

            CreateMap<Product, ProductResponseDto>();

            CreateMap<UpdateProductRequestDto, Product>();

            CreateMap<Product, DeleteEntityResponseDto>();

            CreateMap<Product, ImageResponseDto>();
        }
    }
}
