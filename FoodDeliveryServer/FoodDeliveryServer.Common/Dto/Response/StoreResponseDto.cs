using FoodDeliveryServer.Common.Dto.Shared;

namespace FoodDeliveryServer.Common.Dto.Response
{
    public class StoreResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int DeliveryTimeInMinutes { get; set; }
        public decimal DeliveryFee { get; set; } = decimal.Zero;
        public string Category { get; set; } = string.Empty;
        public List<CoordinateDto> Coordinates { get; set; } = default!;
        public long PartnerId { get; set; }
        public string? Image { get; set; }
    }
}
