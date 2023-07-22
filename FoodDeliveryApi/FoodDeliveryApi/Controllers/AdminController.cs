using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApi.Controllers
{
    [ApiController]
    [Route("/api/admins")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdminRequestDto requestDto)
        {
            RegisterAdminResponseDto responseDto;

            try
            {
                responseDto = await _adminService.RegisterAdmin(requestDto);
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(responseDto);
        }
    }
}
