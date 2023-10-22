using Microsoft.Extensions.Primitives;

namespace FoodDeliveryServer.Api.Interfaces.Services
{
    public interface IStripeService
    {
        public Task HandleStripeWebhook(string json, StringValues signature);
    }
}
