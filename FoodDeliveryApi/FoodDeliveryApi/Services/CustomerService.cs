using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Customer;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;

namespace FoodDeliveryApi.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IValidator<Customer> _validator;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IValidator<Customer> validator, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<RegisterCustomerResponseDto> RegisterCustomer(RegisterCustomerRequestDto requestDto)
        {
            Customer customer = _mapper.Map<Customer>(requestDto);

            ValidationResult validationResult = _validator.Validate(customer);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            if (await _customerRepository.IsEmailTaken(customer.Email))
            {
                throw new UserAlreadyExistsException("Customer with this email already exists");
            }

            if (await _customerRepository.IsUsernameTaken(customer.Username))
            {
                throw new UserAlreadyExistsException("Customer with this username already exists");
            }

            // Hash password
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            customer.Password = BCrypt.Net.BCrypt.HashPassword(customer.Password, salt);

            try
            {
                customer = await _customerRepository.RegisterCustomer(customer);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<RegisterCustomerResponseDto>(customer);
        }
    }
}
