using FluentValidation;
using FoodDeliveryApi.Dto.Customer;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace FoodDeliveryApi.Controllers
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
                return NotFound(ex.Message);
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
                return Conflict(ex.Message);
            }

            return Ok(responseDto);
        }
    }
}
