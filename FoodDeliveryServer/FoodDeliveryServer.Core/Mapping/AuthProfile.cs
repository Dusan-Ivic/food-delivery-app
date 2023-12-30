using AutoMapper;
using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.User;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<User, UserResponseDto>();

            CreateMap<User, AdminResponseDto>();

            CreateMap<User, PartnerResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => ((Partner)src).Status));

            CreateMap<User, CustomerResponseDto>();

            CreateMap<ChangePasswordRequestDto, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.OldPassword));

            CreateMap<User, ImageResponseDto>();
        }
    }
}
