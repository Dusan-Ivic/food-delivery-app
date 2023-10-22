using FluentValidation;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Validators
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

            RuleFor(x => x.DeliveryTimeInMinutes)
                .NotNull().WithMessage("Delivery time is required")
                .GreaterThan(0).WithMessage("Delivery time must be greater than zero");

            RuleFor(x => x.DeliveryFee)
                .NotNull().WithMessage("Delivery fee is required")
                .GreaterThanOrEqualTo(0).WithMessage("Delivery fee can't be a negative number");

            RuleFor(x => x.Category)
                .NotNull().WithMessage("Category is required")
                .MaximumLength(20).WithMessage("Category is too long");

            RuleFor(x => x.Coordinates)
                .NotNull().WithMessage("Coordinates are required")
                .Custom((coordinates, context) =>
                {
                    if (coordinates.Count < 4)
                    {
                        context.AddFailure("Coordinates must have at least 4 points");
                    }
                })
                .Custom((coordinates, context) =>
                {
                    var firstPoint = coordinates[0];
                    var lastPoint = coordinates[coordinates.Count - 1];

                    if (firstPoint.X != lastPoint.X || firstPoint.Y != lastPoint.Y)
                    {
                        context.AddFailure("Coordinates must form a closed ring");
                    }
                });
        }
    }
}
