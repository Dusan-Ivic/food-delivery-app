using AutoMapper;
using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Models;

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

            CreateMap<OrderItem, GetOrderItemResponseDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.ProductPrice, opt => opt.MapFrom(src => (src.TotalPrice / src.Quantity)));

            CreateMap<Order, DeleteOrderResponseDto>();
        }
    }
}
