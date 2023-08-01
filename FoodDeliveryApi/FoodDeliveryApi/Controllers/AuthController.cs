using FluentValidation;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Dto.Error;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

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
                return Unauthorized(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ErrorResponseDto()
                {
                    Message = "One or more validation errors occurred. See the 'Errors' for details.",
                    Errors = ex.Errors.Select(err => err.ErrorMessage).ToList()
                });
            }

            return Ok(responseDto);
        }

        [HttpPut("password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            try
            {
                await _authService.ChangePassword(userId, userType, requestDto);
            }
            catch (IncorrectLoginCredentialsException ex)
            {
                return Unauthorized(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ErrorResponseDto()
                {
                    Message = "One or more validation errors occurred. See the 'Errors' for details.",
                    Errors = ex.Errors.Select(err => err.ErrorMessage).ToList()
                });
            }

            return Ok("Password successfully changed");
        }

        [HttpPut("image")]
        [Authorize]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            ImageResponseDto responseDto;

            try
            {
               responseDto = await _authService.UploadImage(userId, userType, image);
            }
            catch (InvalidImageException ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpGet("image")]
        [Authorize]
        public async Task<IActionResult> GetImage()
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            ImageResponseDto responseDto;

            try
            {
                responseDto = await _authService.GetImage(userId, userType);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }
    }
}
