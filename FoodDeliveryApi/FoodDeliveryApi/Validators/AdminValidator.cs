using FluentValidation;
using FluentValidation.Validators;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Validators
{
    public class AdminValidator : AbstractValidator<Admin>
    {
        public AdminValidator()
        {
            Include(new UserValidator());
        }
    }
}
