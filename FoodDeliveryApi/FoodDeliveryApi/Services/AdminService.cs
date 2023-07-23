using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Services
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

        public async Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto)
        {
            Admin admin = _mapper.Map<Admin>(requestDto);

            ValidationResult validationResult = _validator.Validate(admin);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            // Hash password
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password, salt);

            try
            {
                admin = await _adminRepository.RegisterAdmin(admin);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<RegisterAdminResponseDto>(admin);
        }
    }
}
