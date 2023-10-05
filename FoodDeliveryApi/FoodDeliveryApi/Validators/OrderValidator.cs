using FluentValidation;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Validators
{
    public class OrderValidator : AbstractValidator<Order>
    {
        public OrderValidator()
        {
            RuleFor(x => x.StoreId)
                .NotEmpty().WithMessage("Store Id is required");

            RuleFor(x => x.Items)
                .NotEmpty().WithMessage("The 'Items' list shouldn't be empty")
                .ForEach(x => x.SetValidator(new OrderItemValidator()));

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Address is required")
                .MaximumLength(100).WithMessage("Address is too long");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("City is required")
                .MaximumLength(50).WithMessage("City is too long");

            RuleFor(x => x.PostalCode)
                .NotEmpty().WithMessage("Postal code is required")
                .MaximumLength(10).WithMessage("Postal code is too long");

            RuleFor(x => x.Coordinate)
                .NotNull().WithMessage("Coordinate is required");
        }
    }

    public class OrderItemValidator : AbstractValidator<OrderItem>
    {
        public OrderItemValidator()
        {
            RuleFor(x => x.ProductId)
                .NotEmpty().WithMessage("Product Id is required");

            RuleFor(x => x.Quantity)
                .NotNull().WithMessage("Quantity is required")
                .GreaterThan(0).WithMessage("Quantity must be greater than zero");
        }
    }
}
