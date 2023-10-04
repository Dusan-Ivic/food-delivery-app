namespace FoodDeliveryApi.Exceptions
{
    public class InvalidPolygonException : Exception
    {
        public InvalidPolygonException()
        {
        }

        public InvalidPolygonException(string? message) : base(message)
        {
        }

        public InvalidPolygonException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
