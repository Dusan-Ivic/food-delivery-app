using AutoMapper;
using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Dto.User;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
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
