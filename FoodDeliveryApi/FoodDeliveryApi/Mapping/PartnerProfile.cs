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

            CreateMap<Partner, GetPartnerResponseDto>();

            CreateMap<UpdatePartnerRequestDto, Partner>();
            CreateMap<Partner, UpdatePartnerResponseDto>();

            CreateMap<Partner, DeletePartnerResponseDto>();

            CreateMap<VerifyPartnerRequestDto, Partner>();
        }
    }
}
