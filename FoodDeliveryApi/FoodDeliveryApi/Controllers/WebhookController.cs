using FoodDeliveryApi.Dto.Order;
using FoodDeliveryApi.Dto.Geolocation;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using FoodDeliveryApi.Interfaces.Services;

namespace FoodDeliveryApi.Controllers
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
