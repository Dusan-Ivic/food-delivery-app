using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<RegisterUserRequestDto, Admin>();

            CreateMap<Admin, AdminResponseDto>();

            CreateMap<UpdateUserRequestDto, Admin>();
        }
    }
}
