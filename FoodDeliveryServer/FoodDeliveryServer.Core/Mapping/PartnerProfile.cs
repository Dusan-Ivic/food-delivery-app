using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class PartnerProfile : Profile
    {
        public PartnerProfile()
        {
            CreateMap<RegisterUserRequestDto, Partner>();

            CreateMap<Partner, PartnerResponseDto>();

            CreateMap<UpdateUserRequestDto, Partner>();

            CreateMap<Partner, DeleteEntityResponseDto>();

            CreateMap<VerifyPartnerRequestDto, Partner>();
        }
    }
}
