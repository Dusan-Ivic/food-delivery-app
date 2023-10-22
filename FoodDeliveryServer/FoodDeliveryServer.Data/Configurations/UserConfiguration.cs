using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryServer.Data.Configurations
{
    public class UserConfiguration<T> : IEntityTypeConfiguration<T> where T : User
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Username).IsRequired().HasMaxLength(20);
            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Password).IsRequired().HasMaxLength(60);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(254);
            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(50);

            builder.Property(x => x.LastName).IsRequired().HasMaxLength(50);
        }
    }
}
