using AutoMapper;
using FoodDeliveryServer.Common.Dto.Geolocation;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Core.Converters;
using FoodDeliveryServer.Data.Models;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Core.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<CoordinateDto, Coordinate>().ReverseMap();
            CreateMap<Coordinate, Point>().ConvertUsing(new CoordinateToPointConverter());

            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<OrderItem, OrderItemResponseDto>();

            CreateMap<OrderRequestDto, Order>();
            CreateMap<Order, OrderResponseDto>()
                .ForMember(dest => dest.Coordinate, opt => opt.MapFrom(src => src.DeliveryLocation.Coordinate));

            CreateMap<OrderItem, OrderResponseDto>();

            CreateMap<Order, DeleteEntityResponseDto>();
        }
    }
}
