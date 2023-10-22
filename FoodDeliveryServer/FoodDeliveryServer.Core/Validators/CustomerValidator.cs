using FluentValidation;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Validators
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            Include(new UserValidator());

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Address is required")
                .MaximumLength(100).WithMessage("Address is too long");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("City is required")
                .MaximumLength(50).WithMessage("City is too long");

            RuleFor(x => x.PostalCode)
                .NotEmpty().WithMessage("Postal code is required")
                .MaximumLength(10).WithMessage("Postal code is too long");
        }
    }
}
