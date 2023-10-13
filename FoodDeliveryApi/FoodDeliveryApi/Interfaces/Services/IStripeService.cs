using Microsoft.Extensions.Primitives;

namespace FoodDeliveryApi.Interfaces.Services
{
    public interface IStripeService
    {
        public Task HandleStripeWebhook(string json, StringValues signature);
    }
}
