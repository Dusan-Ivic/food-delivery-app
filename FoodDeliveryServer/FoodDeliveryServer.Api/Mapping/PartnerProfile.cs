using AutoMapper;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Mapping
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
