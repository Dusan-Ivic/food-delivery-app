using FluentValidation;
using FoodDeliveryServer.Data.Models;

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
