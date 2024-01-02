using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodDeliveryServer.Api.Controllers
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
        public async Task<IActionResult> GetStores([FromQuery] long? partnerId = null, double? latitude = null, double? longitude = null)
        {
            List<StoreResponseDto> responseDto = await _storeService.GetStores(partnerId ?? null, latitude ?? null, longitude ?? null);

            return Ok(responseDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStore(long id)
        {
            StoreResponseDto responseDto = await _storeService.GetStore(id);

            return Ok(responseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Partner", Policy = "VerifiedPartner")]
        public async Task<IActionResult> CreateStore([FromBody] StoreRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            StoreResponseDto responseDto = await _storeService.CreateStore(userId, requestDto);

            return Ok(responseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Partner", Policy = "VerifiedPartner")]
        public async Task<IActionResult> UpdateStore(long id, [FromBody] StoreRequestDto requestDto)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            StoreResponseDto responseDto = await _storeService.UpdateStore(id, userId, requestDto);

            return Ok(responseDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStore(long id)
        {
            DeleteEntityResponseDto responseDto = await _storeService.DeleteStore(id);

            return Ok(responseDto);
        }

        [HttpPut("{id}/image")]
        [Authorize(Roles = "Partner", Policy = "VerifiedPartner")]
        public async Task<IActionResult> UploadImage(long id, [FromForm] IFormFile image)
        {
            Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            long userId = long.Parse(idClaim!.Value);

            Claim? roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            UserType userType = (UserType)Enum.Parse(typeof(UserType), roleClaim!.Value);

            using Stream imageStream = image.OpenReadStream();

            ImageResponseDto responseDto = await _storeService.UploadImage(id, userId, imageStream, image.FileName);

            return Ok(responseDto);
        }
    }
}
