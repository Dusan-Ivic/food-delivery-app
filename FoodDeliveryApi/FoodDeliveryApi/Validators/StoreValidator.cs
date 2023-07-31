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

            RuleFor(x => x.DeliveryOptions)
                .NotNull().WithMessage("Delivery options are required")
                .SetValidator(new DeliveryOptionsValidator());

            RuleFor(x => x.Category)
                .NotNull().WithMessage("Category is required");
        }
    }

    public class DeliveryOptionsValidator : AbstractValidator<DeliveryOptions>
    {
        public DeliveryOptionsValidator()
        {
            RuleFor(x => x.DeliveryTimeInMinutes)
                .NotNull().WithMessage("Delivery time is required")
                .GreaterThan(0).WithMessage("Delivery time must be greater than zero");

            RuleFor(x => x.DeliveryFee)
                .NotNull().WithMessage("Delivery fee is required")
                .GreaterThanOrEqualTo(0).WithMessage("Delivery fee can't be a negative number");
        }
    }
}
