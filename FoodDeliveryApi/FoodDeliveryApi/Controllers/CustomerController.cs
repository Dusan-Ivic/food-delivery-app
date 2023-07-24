using FluentValidation;
using FoodDeliveryApi.Dto.Customer;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

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
