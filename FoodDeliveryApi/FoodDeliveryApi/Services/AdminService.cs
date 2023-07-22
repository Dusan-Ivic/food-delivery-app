using AutoMapper;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto)
        {
            try
            {
                Admin admin = _mapper.Map<Admin>(requestDto);

                // Hash password
                string salt = BCrypt.Net.BCrypt.GenerateSalt();
                admin.Password = BCrypt.Net.BCrypt.HashPassword(requestDto.Password, salt);

                admin = await _adminRepository.RegisterAdmin(admin);

                return _mapper.Map<RegisterAdminResponseDto>(admin);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
