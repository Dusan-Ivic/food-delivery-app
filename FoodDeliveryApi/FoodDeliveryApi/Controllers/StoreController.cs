using FluentValidation;
using FoodDeliveryApi.Dto.Error;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodDeliveryApi.Controllers
{
    [ApiController]
    [Route("/api/stores")]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStores()
        {
            List<GetStoreResponseDto> responseDto = await _storeService.GetStores();

            return Ok(responseDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetStore(long id)
        {
            GetStoreResponseDto responseDto;

            try
            {
                responseDto = await _storeService.GetStore(id);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Partner", Policy = "VerifiedPartner")]
        public async Task<IActionResult> CreateStore([FromBody] CreateStoreRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            CreateStoreResponseDto responseDto;

            try
            {
                responseDto = await _storeService.CreateStore(userId, requestDto);
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
    }
}
