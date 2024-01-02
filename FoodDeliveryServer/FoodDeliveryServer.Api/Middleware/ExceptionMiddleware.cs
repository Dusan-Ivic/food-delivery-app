using FluentValidation;
using FoodDeliveryServer.Common.Dto.Response;
using FoodDeliveryServer.Common.Exceptions;
using System.Net;
using System.Text.Json;

namespace FoodDeliveryServer.Api.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
			try
			{
				await next(context);
			}
			catch (Exception ex)
			{
				await HandleException(context, ex);
			}
        }

		private static Task HandleException(HttpContext context, Exception exception)
		{
			ErrorResponseDto errorDto = new ErrorResponseDto()
			{
				Message = exception.Message,
			};

            int statusCode;

            switch (exception)
			{
				case ResourceNotFoundException:
                    statusCode = (int)HttpStatusCode.NotFound;
					break;
				case ValidationException:
					errorDto.Message = "Validation failed";
					errorDto.Errors = ((ValidationException)exception).Errors.Select(err => err.ErrorMessage).ToList();
					statusCode = (int)HttpStatusCode.BadRequest;
					break;
				case UserAlreadyExistsException:
					statusCode = (int)HttpStatusCode.Conflict;
					break;
				case IncorrectLoginCredentialsException:
					statusCode = (int)HttpStatusCode.Unauthorized;
					break;
				case InvalidImageException:
					statusCode = (int)HttpStatusCode.BadRequest;
					break;
				case AddressNotSupportedException:
					statusCode = (int)HttpStatusCode.BadRequest;
					break;
				case InsufficientQuantityException:
					statusCode = (int)HttpStatusCode.Conflict;
					break;
				case IncompatibleItemsError:
					statusCode = (int)HttpStatusCode.BadRequest;
					break;
				case InvalidTopologyException:
					statusCode = (int)HttpStatusCode.BadRequest;
					break;
				case ActionNotAllowedException:
					statusCode = (int)HttpStatusCode.Forbidden;
					break;
				case OrderCancellationException:
                    statusCode = (int)HttpStatusCode.Conflict;
                    break;
				case ArgumentException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    break;
                default:
					errorDto.Message = "Something unexpected happened...";
					statusCode = (int)HttpStatusCode.InternalServerError;
					break;
			}

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";

			JsonSerializerOptions options = new JsonSerializerOptions()
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			};

			return context.Response.WriteAsync(JsonSerializer.Serialize(errorDto, options));
		}
    }
}
