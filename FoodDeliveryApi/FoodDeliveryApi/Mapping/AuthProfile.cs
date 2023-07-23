using AutoMapper;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<LoginUserRequestDto, User>();
            CreateMap<User, LoginUserResponseDto>();

            CreateMap<ChangePasswordRequestDto, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.OldPassword));
        }
    }
}
