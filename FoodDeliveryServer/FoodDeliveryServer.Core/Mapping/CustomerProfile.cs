using AutoMapper;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<RegisterUserRequestDto, Customer>();

            CreateMap<Customer, CustomerResponseDto>();

            CreateMap<UpdateUserRequestDto, Customer>();

            CreateMap<Customer, DeleteEntityResponseDto>();
        }
    }
}
