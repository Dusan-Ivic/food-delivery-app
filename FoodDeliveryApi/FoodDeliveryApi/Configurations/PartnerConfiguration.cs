using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryApi.Configurations
{
    public class PartnerConfiguration : UserConfiguration<Partner>
    {
        public override void Configure(EntityTypeBuilder<Partner> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Status).IsRequired().HasConversion<string>();
        }
    }
}
