using FoodDeliveryServer.Common.Dto.Order;
using FoodDeliveryServer.Common.Dto.Geolocation;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using FoodDeliveryServer.Core.Interfaces;

namespace FoodDeliveryServer.Api.Controllers
{
    [ApiController]
    [Route("/api/webhooks")]
    public class WebhookController : ControllerBase
    {
        private readonly IStripeService _stripeService;

        public WebhookController(IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        [HttpPost("stripe")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var signature = Request.Headers["Stripe-Signature"];

            try
            {
                await _stripeService.HandleStripeWebhook(json, signature);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
