using FoodDeliveryServer.Common.Dto.Geolocation;
using FoodDeliveryServer.Common.Dto.Order;
using FoodDeliveryServer.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Stripe;
using Stripe.Checkout;

namespace FoodDeliveryServer.Core.Services
{
    public class StripeService : IStripeService
    {
        private readonly IConfigurationSection _stripeSettings;
        private readonly IOrderService _orderService;

        public StripeService(IConfiguration config, IOrderService orderService)
        {
            _stripeSettings = config.GetSection("StripeSettings");
            _orderService = orderService;
        }

        public async Task HandleStripeWebhook(string json, StringValues signature)
        {
            string webhookSecret = _stripeSettings.GetValue<string>("WebhookSecret");

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json, signature, webhookSecret);

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;

                    var options = new SessionGetOptions();
                    options.AddExpand("line_items.data.price.product");

                    var service = new SessionService();

                    Session extendedSession = service.Get(session!.Id, options);

                    string[] coordinates = extendedSession.Metadata["Coordinate"].Split(";");

                    CreateOrderRequestDto requestDto = new CreateOrderRequestDto()
                    {
                        StoreId = long.Parse(extendedSession.Metadata["StoreId"]),
                        Address = extendedSession.Metadata["Address"],
                        Coordinate = new CoordinateDto()
                        {
                            X = double.Parse(coordinates[0]),
                            Y = double.Parse(coordinates[1])
                        },
                        Items = extendedSession.LineItems.Select(item =>
                        {
                            var productItem = item.Price.Product;

                            return new OrderItemRequestDto()
                            {
                                ProductId = long.Parse(productItem.Metadata["ProductId"]),
                                Quantity = int.Parse(productItem.Metadata["Quantity"])
                            };
                        }).ToList(),
                        PaymentIntentId = extendedSession.PaymentIntentId,
                    };

                    long customerId = long.Parse(extendedSession.Metadata["CustomerId"]);
                    _ = await _orderService.CreateOrder(customerId, requestDto);
                }
                else if (stripeEvent.Type == Events.ChargeRefunded)
                {
                    var charge = stripeEvent.Data.Object as Charge;

                    var options = new ChargeGetOptions();
                    options.AddExpand("refunds");

                    var service = new ChargeService();

                    Charge extendedCharge  = service.Get(charge!.Id, options);

                    Refund refund = extendedCharge.Refunds.First();

                    long customerId = long.Parse(refund.Metadata["CustomerId"]);
                    long orderId = long.Parse(refund.Metadata["OrderId"]);

                    _ = await _orderService.CancelOrder(orderId, customerId);
                }

                return;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
