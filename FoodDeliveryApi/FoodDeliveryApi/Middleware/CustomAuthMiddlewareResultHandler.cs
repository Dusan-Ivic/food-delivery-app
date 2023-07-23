using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Authorization.Policy;
using System.Text;

namespace FoodDeliveryApi.Middleware
{
    public class CustomAuthMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            if (authorizeResult.Challenged)
            {
                if (policy.Requirements.Any(req => req is DenyAnonymousAuthorizationRequirement))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync("{\"error\": \"Authentication is required to access this resource. Please provide a valid token or credentials.\"}");
                    return;
                }
            }

            await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}
