using FluentValidation;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Validators
{
    public class StoreValidator : AbstractValidator<Store>
    {
        public StoreValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(100).WithMessage("Name is too long");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description is too long");

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Address is required")
                .MaximumLength(100).WithMessage("Address is too long");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("City is required")
                .MaximumLength(50).WithMessage("City is too long");

            RuleFor(x => x.PostalCode)
                .NotEmpty().WithMessage("Postal code is required")
                .MaximumLength(10).WithMessage("Postal code is too long");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is required")
                .MaximumLength(20).WithMessage("Phone number is too long");
        }
    }
}
