using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace FoodDeliveryServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class SetDeliveryAreaNotNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Polygon>(
                name: "DeliveryArea",
                table: "Stores",
                type: "geometry (polygon)",
                nullable: false,
                oldClrType: typeof(Polygon),
                oldType: "geometry (polygon)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Polygon>(
                name: "DeliveryArea",
                table: "Stores",
                type: "geometry (polygon)",
                nullable: true,
                oldClrType: typeof(Polygon),
                oldType: "geometry (polygon)");
        }
    }
}
