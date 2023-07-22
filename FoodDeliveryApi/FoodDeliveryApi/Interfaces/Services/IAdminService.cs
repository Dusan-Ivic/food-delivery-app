using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IAdminService
    {
        public Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto);
    }
}
