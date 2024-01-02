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
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IValidator<Admin> _validator;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, IValidator<Admin> validator, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<AdminResponseDto> RegisterAdmin(RegisterUserRequestDto requestDto)
        {
            Admin admin = _mapper.Map<Admin>(requestDto);

            ValidationResult validationResult = _validator.Validate(admin);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            if (await _adminRepository.IsEmailTaken(admin.Email))
            {
                throw new UserAlreadyExistsException("Admin with this email already exists");
            }

            if (await _adminRepository.IsUsernameTaken(admin.Username))
            {
                throw new UserAlreadyExistsException("Admin with this username already exists");
            }

            // Hash password
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password, salt);

            admin = await _adminRepository.RegisterAdmin(admin);

            AdminResponseDto responseDto = _mapper.Map<AdminResponseDto>(admin);
            responseDto.UserType = UserType.Admin;

            return responseDto;
        }

        public async Task<AdminResponseDto> UpdateAdmin(long id, UpdateUserRequestDto requestDto)
        {
            Admin? admin = await _adminRepository.GetAdminById(id);

            if (admin == null)
            {
                throw new ResourceNotFoundException("Admin with this id doesn't exist");
            }

            Admin updatedAdmin = _mapper.Map<Admin>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedAdmin, options =>
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

            if (await _adminRepository.IsEmailTaken(updatedAdmin.Email) && updatedAdmin.Email != admin.Email)
            {
                throw new UserAlreadyExistsException("Admin with this email already exists");
            }

            if (await _adminRepository.IsUsernameTaken(updatedAdmin.Username) && updatedAdmin.Username != admin.Username)
            {
                throw new UserAlreadyExistsException("Admin with this username already exists");
            }

            _mapper.Map(requestDto, admin);

            admin = await _adminRepository.UpdateAdmin(admin);

            AdminResponseDto responseDto = _mapper.Map<AdminResponseDto>(admin);
            responseDto.UserType = UserType.Admin;

            return responseDto;
        }
    }
}
