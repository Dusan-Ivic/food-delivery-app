using AutoMapper;
using FoodDeliveryServer.Common.Dto.Geolocation;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
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

            CreateMap<StoreRequestDto, Store>();

            CreateMap<Store, StoreResponseDto>()
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.DeliveryArea.Coordinates));

            CreateMap<Store, DeleteEntityResponseDto>();

            CreateMap<Store, ImageResponseDto>();
        }
    }
}
