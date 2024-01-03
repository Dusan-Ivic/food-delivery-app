using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<User, UserResponseDto>();

            CreateMap<User, PartnerResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => ((Partner)src).Status));

            CreateMap<ChangePasswordRequestDto, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.OldPassword));

            CreateMap<UpdateUserRequestDto, User>();

            CreateMap<User, ImageResponseDto>();
        }
    }
}
