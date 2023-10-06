using AutoMapper;
using FoodDeliveryApi.Converters;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Dto.Geolocation;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Models;
using NetTopologySuite.Geometries;

namespace FoodDeliveryApi.Mapping
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
