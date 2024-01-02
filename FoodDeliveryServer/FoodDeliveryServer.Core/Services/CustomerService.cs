using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Services
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

        public async Task<CustomerResponseDto> GetCustomer(long id)
        {
            Customer? customer = await _customerRepository.GetCustomerById(id);

            if (customer == null)
            {
                throw new ResourceNotFoundException("Customer with this id doesn't exist");
            }

            return _mapper.Map<CustomerResponseDto>(customer);
        }

        public async Task<List<CustomerResponseDto>> GetCustomers()
        {
            List<Customer> customers = await _customerRepository.GetAllCustomers();

            return _mapper.Map<List<CustomerResponseDto>>(customers);
        }

        public async Task<CustomerResponseDto> RegisterCustomer(RegisterUserRequestDto requestDto)
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

            customer = await _customerRepository.RegisterCustomer(customer);

            CustomerResponseDto responseDto = _mapper.Map<CustomerResponseDto>(customer);
            responseDto.UserType = UserType.Customer;

            return responseDto;
        }

        public async Task<CustomerResponseDto> UpdateCustomer(long id, UpdateUserRequestDto requestDto)
        {
            Customer? customer = await _customerRepository.GetCustomerById(id);

            if (customer == null)
            {
                throw new ResourceNotFoundException("Customer with this id doesn't exist");
            }

            Customer updatedCustomer = _mapper.Map<Customer>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedCustomer, options =>
            {
                options.IncludeProperties(x => x.Username);
                options.IncludeProperties(x => x.Email);
                options.IncludeProperties(x => x.FirstName);
                options.IncludeProperties(x => x.LastName);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            if (await _customerRepository.IsEmailTaken(updatedCustomer.Email) && updatedCustomer.Email != customer.Email)
            {
                throw new UserAlreadyExistsException("Customer with this email already exists");
            }

            if (await _customerRepository.IsUsernameTaken(updatedCustomer.Username) && updatedCustomer.Username != customer.Username)
            {
                throw new UserAlreadyExistsException("Customer with this username already exists");
            }

            _mapper.Map(requestDto, customer);

            customer = await _customerRepository.UpdateCustomer(customer);

            CustomerResponseDto responseDto = _mapper.Map<CustomerResponseDto>(customer);
            responseDto.UserType = UserType.Customer;

            return responseDto;
        }

        public async Task<DeleteEntityResponseDto> DeleteCustomer(long id)
        {
            Customer? customer = await _customerRepository.GetCustomerById(id);

            if (customer == null)
            {
                throw new ResourceNotFoundException("Customer with this id doesn't exist");
            }

            await _customerRepository.DeleteCustomer(customer);

            return _mapper.Map<DeleteEntityResponseDto>(customer);
        }
    }
}
