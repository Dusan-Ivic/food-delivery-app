using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodDeliveryServer.Api.Controllers
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
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterUserRequestDto requestDto)
        {
            AdminResponseDto responseDto = await _adminService.RegisterAdmin(requestDto);

            return Ok(responseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAdmin(long id, [FromBody] UpdateUserRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            AdminResponseDto responseDto = await _adminService.UpdateAdmin(id, requestDto);

            return Ok(responseDto);
        }
    }
}
