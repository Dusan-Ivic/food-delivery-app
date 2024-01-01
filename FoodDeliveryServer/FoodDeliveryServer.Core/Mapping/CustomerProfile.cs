using AutoMapper;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Mapping
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
