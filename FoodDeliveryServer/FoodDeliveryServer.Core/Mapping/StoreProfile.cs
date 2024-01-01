using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class StoreProfile : Profile
    {
        public StoreProfile()
        {
            CreateMap<StoreRequestDto, Store>();

            CreateMap<Store, StoreResponseDto>()
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.DeliveryArea.Coordinates));

            CreateMap<Store, DeleteEntityResponseDto>();

            CreateMap<Store, ImageResponseDto>();
        }
    }
}
