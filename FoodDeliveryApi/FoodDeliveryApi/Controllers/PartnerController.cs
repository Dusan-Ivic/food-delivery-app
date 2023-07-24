using FluentValidation;
using FoodDeliveryApi.Dto.Partner;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodDeliveryApi.Controllers
{
    [ApiController]
    [Route("/api/partners")]
    public class PartnerController : ControllerBase
    {
        private readonly IPartnerService _partnerService;

        public PartnerController(IPartnerService partnerService)
        {
            _partnerService = partnerService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPartners([FromQuery] string? status = null)
        {
            List<GetPartnerResponseDto> responseDto;

            try
            {
                responseDto = await _partnerService.GetPartners(status);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(responseDto);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPartner(long id)
        {
            GetPartnerResponseDto responseDto;

            try
            {
                responseDto = await _partnerService.GetPartner(id);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(ex.Message);
            }

            return Ok(responseDto);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPartner([FromBody] RegisterPartnerRequestDto requestDto)
        {
            RegisterPartnerResponseDto responseDto;

            try
            {
                responseDto = await _partnerService.RegisterPartner(requestDto);
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
        [Authorize(Roles = "Partner")]
        public async Task<IActionResult> UpdatePartner(long id, [FromBody] UpdatePartnerRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            if (userId != id)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Users can't update information of other users. Access is restricted.");
            }

            UpdatePartnerResponseDto responseDto;

            try
            {
                responseDto = await _partnerService.UpdatePartner(id, requestDto);
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
