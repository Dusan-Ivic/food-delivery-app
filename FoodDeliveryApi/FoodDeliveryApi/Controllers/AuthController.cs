using FluentValidation;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApi.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserRequestDto requestDto)
        {
            LoginUserResponseDto responseDto;

            try
            {
                responseDto = await _authService.LoginUser(requestDto);
            }
            catch (IncorrectLoginCredentialsException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.Select(err => err.ErrorMessage));
            }

            return Ok(responseDto);
        }
    }
}
