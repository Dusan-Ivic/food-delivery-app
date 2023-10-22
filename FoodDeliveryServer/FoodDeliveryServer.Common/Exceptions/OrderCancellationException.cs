namespace FoodDeliveryServer.Common.Exceptions
{
    public class OrderCancellationException : Exception
    {
        public OrderCancellationException()
        {
        }

        public OrderCancellationException(string? message) : base(message)
        {
        }

        public OrderCancellationException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
