using AutoMapper;
using FoodDeliveryServer.Api.Converters;
using FoodDeliveryServer.Api.Dto.Auth;
using FoodDeliveryServer.Api.Dto.Geolocation;
using FoodDeliveryServer.Api.Dto.Store;
using FoodDeliveryServer.Api.Models;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Api.Mapping
{
    public class StoreProfile : Profile
    {
        public StoreProfile()
        {
            CreateMap<CoordinateDto, Coordinate>().ReverseMap();

            CreateMap<List<Coordinate>, Polygon>().ConvertUsing(new CoordinatesToPolygonConverter());

            CreateMap<CreateStoreRequestDto, Store>();
            CreateMap<Store, CreateStoreResponseDto>()
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.DeliveryArea.Coordinates));

            CreateMap<Store, GetStoreResponseDto>()
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.DeliveryArea.Coordinates));

            CreateMap<UpdateStoreRequestDto, Store>();
            CreateMap<Store, UpdateStoreResponseDto>()
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.DeliveryArea.Coordinates));

            CreateMap<Store, DeleteStoreResponseDto>();

            CreateMap<Store, ImageResponseDto>();
        }
    }
}
