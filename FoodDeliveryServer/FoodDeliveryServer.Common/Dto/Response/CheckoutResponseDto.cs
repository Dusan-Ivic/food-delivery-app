namespace FoodDeliveryServer.Common.Dto.Response
{
    public class CheckoutResponseDto
    {
        public OrderResponseDto Order { get; set; } = default!;
        public string SessionUrl { get; set; } = string.Empty;
    }
}
