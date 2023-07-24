using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodDeliveryApi.Configurations
{
    public class AdminConfiguration : UserConfiguration
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
        }
    }
}
