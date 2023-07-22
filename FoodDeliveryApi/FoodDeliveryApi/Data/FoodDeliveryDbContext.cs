using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApi.Data
{
    public class FoodDeliveryDbContext : DbContext
    {
        public FoodDeliveryDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
