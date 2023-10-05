using AutoMapper;
using FoodDeliveryApi.Converters;
using FoodDeliveryApi.Dto.Geolocation;
using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Models;
using Microsoft.AspNetCore.Routing.Constraints;
using NetTopologySuite.Geometries;

namespace FoodDeliveryApi.Mapping
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
