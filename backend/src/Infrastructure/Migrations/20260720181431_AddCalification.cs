using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCalification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Califications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    IdQualifier = table.Column<Guid>(type: "TEXT", nullable: false),
                    IdQualified = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Score = table.Column<int>(type: "INTEGER", nullable: false),
                    State = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Califications", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Califications");
        }
    }
}
