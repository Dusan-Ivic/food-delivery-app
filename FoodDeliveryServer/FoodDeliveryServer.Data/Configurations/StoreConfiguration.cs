using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryServer.Data.Configurations
{
    public class StoreConfiguration : IEntityTypeConfiguration<Store>
    {
        public void Configure(EntityTypeBuilder<Store> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Description).HasMaxLength(500);

            builder.Property(x => x.Address).IsRequired().HasMaxLength(100);

            builder.Property(x => x.City).IsRequired().HasMaxLength(50);

            builder.Property(x => x.PostalCode).IsRequired().HasMaxLength(10);

            builder.Property(x => x.Phone).IsRequired().HasMaxLength(20);

            builder.HasOne(x => x.Partner).WithMany(x => x.Stores).HasForeignKey(x => x.PartnerId);

            builder.Property(x => x.DeliveryTimeInMinutes).IsRequired();

            builder.Property(x => x.DeliveryFee).IsRequired();

            builder.Property(x => x.Category).IsRequired().HasMaxLength(20);

            builder.Property(x => x.DeliveryArea).IsRequired().HasColumnType("geometry (polygon)");

            builder.Ignore(x => x.Coordinates);
        }
    }
}
