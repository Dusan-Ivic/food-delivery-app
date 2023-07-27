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
