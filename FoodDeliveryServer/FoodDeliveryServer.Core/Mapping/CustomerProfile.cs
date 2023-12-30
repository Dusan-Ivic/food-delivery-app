using AutoMapper;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<RegisterUserRequestDto, Customer>();
            CreateMap<Customer, RegisterCustomerResponseDto>();

            CreateMap<Customer, GetCustomerResponseDto>();

            CreateMap<UpdateUserRequestDto, Customer>();
            CreateMap<Customer, UpdateCustomerResponseDto>();

            CreateMap<Customer, DeleteCustomerResponseDto>();
        }
    }
}
