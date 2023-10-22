namespace FoodDeliveryServer.Common.Dto.Error
{
    public class ErrorResponseDto
    {
        public string Message { get; set; } = string.Empty;
        public List<string> Errors { get; set; } = new List<string>();
    }
}
