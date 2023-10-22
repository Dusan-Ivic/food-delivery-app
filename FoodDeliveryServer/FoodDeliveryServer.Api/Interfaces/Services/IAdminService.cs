using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Interfaces.Services
{
    public interface IAdminService
    {
        public Task<RegisterAdminResponseDto> RegisterAdmin(RegisterAdminRequestDto requestDto);
        public Task<UpdateAdminResponseDto> UpdateAdmin(long id, UpdateAdminRequestDto requestDto);
    }
}
