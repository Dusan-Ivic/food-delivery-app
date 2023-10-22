using AutoMapper;
using FoodDeliveryServer.Api.Dto.Admin;
using FoodDeliveryServer.Api.Dto.Auth;
using FoodDeliveryServer.Api.Dto.Customer;
using FoodDeliveryServer.Api.Dto.Partner;
using FoodDeliveryServer.Api.Dto.User;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Mapping
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<LoginUserRequestDto, User>();

            CreateMap<User, UserResponseDto>();

            CreateMap<User, AdminResponseDto>();

            CreateMap<User, PartnerResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => ((Partner)src).Status));

            CreateMap<User, CustomerResponseDto>()
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => ((Customer)src).Address))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => ((Customer)src).City))
                .ForMember(dest => dest.PostalCode, opt => opt.MapFrom(src => ((Customer)src).PostalCode));

            CreateMap<ChangePasswordRequestDto, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.OldPassword));

            CreateMap<User, ImageResponseDto>();
        }
    }
}
