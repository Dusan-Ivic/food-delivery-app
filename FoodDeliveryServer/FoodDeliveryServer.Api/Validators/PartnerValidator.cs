using FluentValidation;
using FoodDeliveryServer.Api.Models;

namespace FoodDeliveryServer.Api.Validators
{
    public class PartnerValidator : AbstractValidator<Partner>
    {
        public PartnerValidator()
        {
            Include(new UserValidator());
            RuleFor(x => x.Status).IsInEnum().WithMessage("Status is not valid");
        }
    }
}
