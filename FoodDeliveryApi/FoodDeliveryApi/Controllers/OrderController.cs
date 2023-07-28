using FluentValidation;
using FoodDeliveryApi.Dto.Error;
using FoodDeliveryApi.Dto.Order;
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
    [Route("/api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GetOrders()
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            List<GetOrderResponseDto> responseDto = await _orderService.GetOrders(userId, userType);

            return Ok(responseDto);
        }

        [HttpGet("items")]
        [Authorize(Roles = "Partner", Policy = "VerifiedPartner")]
        public async Task<IActionResult> GetOrderItems([FromQuery] long? storeId = null)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            List<GetOrderItemResponseDto> responseDto = await _orderService.GetOrderItems(userId, storeId ?? null);

            return Ok(responseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            CreateOrderResponseDto responseDto;

            try
            {
                responseDto = await _orderService.CreateOrder(userId, requestDto);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ErrorResponseDto()
                {
                    Message = "One or more validation errors occurred. See the 'Errors' for details.",
                    Errors = ex.Errors.Select(err => err.ErrorMessage).ToList()
                });
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (InsufficientQuantityException ex)
            {
                return Conflict(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (IncompatibleItemsError ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (MinimumOrderAmountException ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }
    }
}
