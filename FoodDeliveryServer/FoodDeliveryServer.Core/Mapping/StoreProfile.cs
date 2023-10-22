using AutoMapper;
using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.Geolocation;
using FoodDeliveryServer.Common.Dto.Store;
using FoodDeliveryServer.Core.Converters;
using FoodDeliveryServer.Data.Models;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Core.Mapping
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
