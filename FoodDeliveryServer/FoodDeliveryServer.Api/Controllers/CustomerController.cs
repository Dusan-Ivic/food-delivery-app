using FluentValidation;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Error;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace FoodDeliveryServer.Api.Controllers
{
    [ApiController]
    [Route("/api/customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCustomers()
        {
            List<GetCustomerResponseDto> responseDto = await _customerService.GetCustomers();

            return Ok(responseDto);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCustomer(long id)
        {
            GetCustomerResponseDto responseDto;

            try
            {
                responseDto = await _customerService.GetCustomer(id);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterCustomerRequestDto requestDto)
        {
            RegisterCustomerResponseDto responseDto;

            try
            {
                responseDto = await _customerService.RegisterCustomer(requestDto);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.Select(err => err.ErrorMessage));
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> UpdateCustomer(long id, [FromBody] UpdateCustomerRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            if (userId != id)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponseDto()
                {
                    Message = "Users can't update information of other users. Access is restricted."
                });
            }

            UpdateCustomerResponseDto responseDto;

            try
            {
                responseDto = await _customerService.UpdateCustomer(id, requestDto);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ErrorResponseDto()
                {
                    Message = "One or more validation errors occurred. See the 'Errors' for details.",
                    Errors = ex.Errors.Select(err => err.ErrorMessage).ToList()
                });
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            DeleteCustomerResponseDto responseDto;

            try
            {
                responseDto = await _customerService.DeleteCustomer(id);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }
    }
}
