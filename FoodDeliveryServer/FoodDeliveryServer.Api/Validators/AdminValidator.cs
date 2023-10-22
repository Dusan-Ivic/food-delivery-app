using FluentValidation;
using FluentValidation.Validators;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Validators
{
    public class AdminValidator : AbstractValidator<Admin>
    {
        public AdminValidator()
        {
            Include(new UserValidator());
        }
    }
}
