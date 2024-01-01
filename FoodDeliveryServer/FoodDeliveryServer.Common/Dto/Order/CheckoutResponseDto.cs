namespace FoodDeliveryServer.Common.Dto.Order
{
    public class CheckoutResponseDto
    {
        public CreateOrderResponseDto Order { get; set; } = default!;
        public string SessionUrl { get; set; } = String.Empty;
    }
}
