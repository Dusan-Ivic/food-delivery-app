using FoodDeliveryServer.Api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryServer.Api.Configurations
{
    public class AdminConfiguration : UserConfiguration<Admin>
    {
        public override void Configure(EntityTypeBuilder<Admin> builder)
        {
            base.Configure(builder);
        }
    }
}
