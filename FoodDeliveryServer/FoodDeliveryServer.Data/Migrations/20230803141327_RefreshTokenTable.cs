using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FoodDeliveryServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTokenTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Stores",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Products",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Partners",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ProductImage",
                table: "OrderItems",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Customers",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Admins",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    ExpiresIn = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    UserType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Stores",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Products",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Partners",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ProductImage",
                table: "OrderItems",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Customers",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Admins",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[0]);
        }
    }
}
