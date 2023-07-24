using FluentValidation;
using FoodDeliveryApi.Dto.Partner;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}
