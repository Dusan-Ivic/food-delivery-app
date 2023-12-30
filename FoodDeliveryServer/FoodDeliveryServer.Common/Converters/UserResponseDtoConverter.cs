﻿using FoodDeliveryServer.Common.Dto.Response;
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
            if (value is PartnerResponseDto partnerDto)
            {
                JsonSerializer.Serialize(writer, partnerDto, options);
            }
            else if (value is UserResponseDto userDto)
            {
                JsonSerializer.Serialize(writer, userDto, options);
            }
            else
            {
                throw new NotSupportedException("Unsupported type: " + value.GetType().Name);
            }
        }
    }
}
