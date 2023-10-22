using FluentValidation;
using FoodDeliveryServer.Data.Models;

namespace FoodDeliveryServer.Core.Validators
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
