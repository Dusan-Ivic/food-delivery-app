using AutoMapper;
using FoodDeliveryServer.Api.Dto.Customer;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Mapping
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<RegisterCustomerRequestDto, Customer>();
            CreateMap<Customer, RegisterCustomerResponseDto>();

            CreateMap<Customer, GetCustomerResponseDto>();

            CreateMap<UpdateCustomerRequestDto, Customer>();
            CreateMap<Customer, UpdateCustomerResponseDto>();

            CreateMap<Customer, DeleteCustomerResponseDto>();
        }
    }
}
