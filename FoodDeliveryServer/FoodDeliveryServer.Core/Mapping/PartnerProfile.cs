using AutoMapper;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class PartnerProfile : Profile
    {
        public PartnerProfile()
        {
            CreateMap<RegisterUserRequestDto, Partner>();
            CreateMap<Partner, RegisterPartnerResponseDto>();

            CreateMap<Partner, GetPartnerResponseDto>();

            CreateMap<UpdateUserRequestDto, Partner>();
            CreateMap<Partner, UpdatePartnerResponseDto>();

            CreateMap<Partner, DeletePartnerResponseDto>();

            CreateMap<VerifyPartnerRequestDto, Partner>();
        }
    }
}
