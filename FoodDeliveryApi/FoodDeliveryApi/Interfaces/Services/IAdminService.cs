using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IAdminService
    {
        public Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto);
        public Task<UpdateAdminResponseDto> UpdateAdmin(long id, UpdateAdminRequestDto requestDto);
    }
}
