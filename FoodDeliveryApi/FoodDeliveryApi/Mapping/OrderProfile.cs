using AutoMapper;
using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Models;
using Microsoft.AspNetCore.Routing.Constraints;

namespace FoodDeliveryApi.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<OrderItem, OrderItemResponseDto>();

            CreateMap<OrderItemRequestDto, OrderItem>();
            CreateMap<Order, OrderItemResponseDto>();

            CreateMap<CreateOrderRequestDto, Order>();
            CreateMap<Order, CreateOrderResponseDto>();

            CreateMap<Order, GetOrderResponseDto>();

            CreateMap<OrderItem, GetOrderItemResponseDto>();

            CreateMap<Order, DeleteOrderResponseDto>();
        }
    }
}
