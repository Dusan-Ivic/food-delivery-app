using FoodDeliveryApi.Dto.Error;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Authorization.Policy;
using System.Text;
using System.Text.Json;

namespace FoodDeliveryApi.Middleware
{
    public class CustomAuthMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            if (authorizeResult.Challenged)
            {
                JsonSerializerOptions serializerOptions = new JsonSerializerOptions();
                serializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

                if (policy.Requirements.Any(req => req is DenyAnonymousAuthorizationRequirement))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    ErrorResponseDto errorDto = new ErrorResponseDto()
                    {
                        Message = "Authentication is required to access this resource. Please provide a valid token or credentials."
                    };
                    
                    await context.Response.WriteAsync(JsonSerializer.Serialize(errorDto, serializerOptions));
                    return;
                }

                if (policy.Requirements.Any(req => req is RolesAuthorizationRequirement))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    ErrorResponseDto errorDto = new ErrorResponseDto()
                    {
                        Message = "You do not have the required role to access this resource."
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(errorDto, serializerOptions));
                    return;
                }
            }

            await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}
