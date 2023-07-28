namespace FoodDeliveryApi.Exceptions
{
    public class MinimumOrderAmountException : Exception
    {
        public MinimumOrderAmountException()
        {
        }

        public MinimumOrderAmountException(string? message) : base(message)
        {
        }

        public MinimumOrderAmountException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
