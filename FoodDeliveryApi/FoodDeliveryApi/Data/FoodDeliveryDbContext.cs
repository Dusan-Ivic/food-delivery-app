using FoodDeliveryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Data
{
    public class FoodDeliveryDbContext : DbContext
    {
        public DbSet<Admin> Admins { get; set; }

        public FoodDeliveryDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(FoodDeliveryDbContext).Assembly);

            modelBuilder.Entity<User>().UseTpcMappingStrategy();
        }
    }
}
