using FluentValidation;
using FluentValidation.Validators;
using FoodDeliveryServer.Data.Models;

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
