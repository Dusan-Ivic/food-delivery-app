using AutoMapper;
using FoodDeliveryServer.Api.Converters;
using FoodDeliveryServer.Api.Dto.Geolocation;
using FoodDeliveryServer.Api.Dto.Order;
using FoodDeliveryServer.Api.Enums;
using FoodDeliveryServer.Api.Models;
using Microsoft.AspNetCore.Routing.Constraints;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Api.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<CoordinateDto, Coordinate>().ReverseMap();
            CreateMap<Coordinate, Point>().ConvertUsing(new CoordinateToPointConverter());

            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<OrderItem, OrderItemResponseDto>();

            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<Order, OrderItemResponseDto>();

            CreateMap<CreateOrderRequestDto, Order>();
            CreateMap<Order, CreateOrderResponseDto>()
                .ForMember(dest => dest.Coordinate, opt => opt.MapFrom(src => src.DeliveryLocation.Coordinate));

            CreateMap<Order, GetOrderResponseDto>()
                .ForMember(dest => dest.Coordinate, opt => opt.MapFrom(src => src.DeliveryLocation.Coordinate));

            CreateMap<OrderItem, GetOrderItemResponseDto>();

            CreateMap<Order, DeleteOrderResponseDto>();
        }
    }
}
