using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryApi.Configurations
{
    public class CustomerConfiguration : UserConfiguration<Customer>
    {
        public override void Configure(EntityTypeBuilder<Customer> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Address).IsRequired().HasMaxLength(100);

            builder.Property(x => x.City).IsRequired().HasMaxLength(50);

            builder.Property(x => x.PostalCode).IsRequired().HasMaxLength(10);
        }
    }
}
