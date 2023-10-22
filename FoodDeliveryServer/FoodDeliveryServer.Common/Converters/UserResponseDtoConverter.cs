using FoodDeliveryServer.Common.Dto.Admin;
using FoodDeliveryServer.Common.Dto.Customer;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Dto.User;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FoodDeliveryServer.Api.Converters
{
    public class UserResponseDtoConverter : JsonConverter<UserResponseDto>
    {
        public override UserResponseDto? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, UserResponseDto value, JsonSerializerOptions options)
        {
            if (value is CustomerResponseDto customerDto)
            {
                JsonSerializer.Serialize(writer, customerDto, options);
            }
            else if (value is PartnerResponseDto partnerDto)
            {
                JsonSerializer.Serialize(writer, partnerDto, options);
            }
            else if (value is AdminResponseDto adminDto)
            {
                JsonSerializer.Serialize(writer, adminDto, options);
            }
            else
            {
                throw new NotSupportedException("Unsupported type: " + value.GetType().Name);
            }
        }
    }
}
