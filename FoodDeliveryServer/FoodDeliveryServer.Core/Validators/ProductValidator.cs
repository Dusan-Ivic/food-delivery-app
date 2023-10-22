using FluentValidation;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(100).WithMessage("Name is too long");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description is too long");

            RuleFor(x => x.Price)
                .NotNull().WithMessage("Price is required")
                .GreaterThan(0).WithMessage("Price must be greater than zero");

            RuleFor(x => x.Quantity)
                .NotNull().WithMessage("Quantity is required")
                .GreaterThan(0).WithMessage("Quantity must be greater than zero");
        }
    }
}
