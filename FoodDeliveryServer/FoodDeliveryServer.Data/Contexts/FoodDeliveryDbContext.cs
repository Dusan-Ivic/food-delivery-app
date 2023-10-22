using FoodDeliveryServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryServer.Data.Contexts
{
    public class FoodDeliveryDbContext : DbContext
    {
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public FoodDeliveryDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(FoodDeliveryDbContext).Assembly);

            modelBuilder.Entity<Admin>().ToTable("Admins");
            modelBuilder.Entity<Partner>().ToTable("Partners");
            modelBuilder.Entity<Customer>().ToTable("Customers");
            modelBuilder.Entity<Store>().ToTable("Stores");
            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
            modelBuilder.Entity<RefreshToken>().ToTable("RefreshTokens");
        }
    }
}
