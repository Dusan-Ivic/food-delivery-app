using AutoMapper;
using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<RegisterUserRequestDto, Admin>();
            CreateMap<Admin, RegisterAdminResponseDto>();

            CreateMap<UpdateUserRequestDto, Admin>();
            CreateMap<Admin, UpdateAdminResponseDto>();
        }
    }
}
