using AutoMapper;
using FoodDeliveryApi.Dto.Partner;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class PartnerProfile : Profile
    {
        public PartnerProfile()
        {
            CreateMap<RegisterPartnerRequestDto, Partner>();
            CreateMap<Partner, RegisterPartnerResponseDto>();
        }
    }
}
