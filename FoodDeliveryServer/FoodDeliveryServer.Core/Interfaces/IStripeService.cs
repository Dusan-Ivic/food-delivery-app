using Microsoft.Extensions.Primitives;

namespace FoodDeliveryServer.Core.Interfaces
{
    public interface IStripeService
    {
        public Task HandleStripeWebhook(string json, StringValues signature);
    }
}
