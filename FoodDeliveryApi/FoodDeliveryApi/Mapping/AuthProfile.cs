using AutoMapper;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<User, LoginUserResponseDto>();
        }
    }
}
