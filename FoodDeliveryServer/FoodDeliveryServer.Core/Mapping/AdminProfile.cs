using AutoMapper;
using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<RegisterAdminRequestDto, Admin>();
            CreateMap<Admin, RegisterAdminResponseDto>();

            CreateMap<UpdateAdminRequestDto, Admin>();
            CreateMap<Admin, UpdateAdminResponseDto>();
        }
    }
}
