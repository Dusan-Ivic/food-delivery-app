using FluentValidation;
using FoodDeliveryServer.Common.Dto.Error;
using FoodDeliveryServer.Common.Dto.Order;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodDeliveryServer.Api.Controllers
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
        [Authorize(Roles = "Customer,Partner,Admin")]
        public async Task<IActionResult> GetOrders()
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            List<GetOrderResponseDto> responseDto = await _orderService.GetOrders(userId, userType);

            return Ok(responseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateCheckout([FromBody] CreateOrderRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            CheckoutResponseDto responseDto;

            try
            {
                responseDto = await _orderService.CreateCheckout(userId, requestDto);
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
            catch (AddressNotSupportedException ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (InsufficientQuantityException ex)
            {
                return Conflict(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (IncompatibleItemsError ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (InvalidTopologyException ex)
            {
                return BadRequest(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> RefundOrder(long id)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            DeleteOrderResponseDto responseDto;

            try
            {
                responseDto = await _orderService.RefundOrder(id, userId);
            }
            catch (ResourceNotFoundException ex)
            {
                return NotFound(new ErrorResponseDto() { Message = ex.Message });
            }
            catch (ActionNotAllowedException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponseDto()
                {
                    Message = ex.Message
                });
            }
            catch (OrderCancellationException ex)
            {
                return Conflict(new ErrorResponseDto() { Message = ex.Message });
            }

            return Ok(responseDto);
        }
    }
}
