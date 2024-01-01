using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<OrderItem, OrderItemResponseDto>();

            CreateMap<OrderRequestDto, Order>();
            CreateMap<Order, OrderResponseDto>()
                .ForMember(dest => dest.Coordinate, opt => opt.MapFrom(src => src.DeliveryLocation.Coordinate));

            CreateMap<Order, DeleteEntityResponseDto>();
        }
    }
}
