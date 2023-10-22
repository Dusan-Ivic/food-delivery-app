using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;

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

        public async Task<GetCustomerResponseDto> GetCustomer(long id)
        {
            Customer? customer = await _customerRepository.GetCustomerById(id);

            if (customer == null)
            {
                throw new ResourceNotFoundException("Customer with this id doesn't exist");
            }

            return _mapper.Map<GetCustomerResponseDto>(customer);
        }

        public async Task<List<GetCustomerResponseDto>> GetCustomers()
        {
            List<Customer> customers = await _customerRepository.GetAllCustomers();

            return _mapper.Map<List<GetCustomerResponseDto>>(customers);
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

            RegisterCustomerResponseDto responseDto = _mapper.Map<RegisterCustomerResponseDto>(customer);
            responseDto.UserType = UserType.Customer;

            return responseDto;
        }

        public async Task<UpdateCustomerResponseDto> UpdateCustomer(long id, UpdateCustomerRequestDto requestDto)
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
                options.IncludeProperties(x => x.Address);
                options.IncludeProperties(x => x.City);
                options.IncludeProperties(x => x.PostalCode);
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

            try
            {
                _mapper.Map(requestDto, customer);
                customer = await _customerRepository.UpdateCustomer(customer);
            }
            catch (Exception)
            {
                throw;
            }

            UpdateCustomerResponseDto responseDto = _mapper.Map<UpdateCustomerResponseDto>(customer);
            responseDto.UserType = UserType.Customer;

            return responseDto;
        }

        public async Task<DeleteCustomerResponseDto> DeleteCustomer(long id)
        {
            Customer? customer = await _customerRepository.GetCustomerById(id);

            if (customer == null)
            {
                throw new ResourceNotFoundException("Customer with this id doesn't exist");
            }

            try
            {
                await _customerRepository.DeleteCustomer(customer);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<DeleteCustomerResponseDto>(customer);
        }
    }
}
