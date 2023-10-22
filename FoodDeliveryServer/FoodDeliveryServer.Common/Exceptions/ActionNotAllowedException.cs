namespace FoodDeliveryServer.Common.Exceptions
{
    public class ActionNotAllowedException : Exception
    {
        public ActionNotAllowedException()
        {
        }

        public ActionNotAllowedException(string? message) : base(message)
        {
        }

        public ActionNotAllowedException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
