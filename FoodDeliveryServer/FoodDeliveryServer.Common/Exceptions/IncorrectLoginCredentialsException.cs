namespace FoodDeliveryServer.Common.Exceptions
{
    public class IncorrectLoginCredentialsException : Exception
    {
        public IncorrectLoginCredentialsException()
        {
        }

        public IncorrectLoginCredentialsException(string? message) : base(message)
        {
        }

        public IncorrectLoginCredentialsException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
