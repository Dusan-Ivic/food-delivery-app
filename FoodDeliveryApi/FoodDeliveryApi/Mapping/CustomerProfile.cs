using AutoMapper;
using FoodDeliveryApi.Dto.Customer;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
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
