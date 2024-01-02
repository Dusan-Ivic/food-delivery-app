using Microsoft.AspNetCore.Mvc;
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

            await _stripeService.HandleStripeWebhook(json, signature);

            return Ok();
        }
    }
}
