using AutoMapper;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<RegisterAdminRequestDto, Admin>();
            CreateMap<Admin, RegisterAdminResponseDto>();
        }
    }
}
