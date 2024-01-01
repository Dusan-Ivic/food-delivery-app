using AutoMapper;
using FoodDeliveryServer.Common.Dto.Shared;
using FoodDeliveryServer.Core.Converters;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Core.Mapping
{
    public class CoordinateProfile : Profile
    {
        public CoordinateProfile()
        {
            CreateMap<CoordinateDto, Coordinate>().ReverseMap();

            CreateMap<Coordinate, Point>().ConvertUsing(new CoordinateToPointConverter());

            CreateMap<List<Coordinate>, Polygon>().ConvertUsing(new CoordinatesToPolygonConverter());
        }
    }
}
