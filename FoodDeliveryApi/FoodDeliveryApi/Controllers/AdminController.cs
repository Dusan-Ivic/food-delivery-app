using FluentValidation;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.Select(err => err.ErrorMessage));
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(responseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAdmin(long id, [FromBody] UpdateAdminRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            if (userId != id)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Users can't update information of other users. Access is restricted.");
            }

            UpdateAdminResponseDto responseDto;

            try
            {
                responseDto = await _adminService.UpdateAdmin(id, requestDto);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.Select(err => err.ErrorMessage));
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(responseDto);
        }
    }
}
