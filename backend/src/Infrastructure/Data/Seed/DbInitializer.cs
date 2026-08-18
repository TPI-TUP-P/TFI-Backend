using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Seed;

public static class DbInitializer
{
    public static async Task InitializeAsync(
        AppDbContext context,
        IPasswordHasherService passwordHasher,
        CancellationToken cancellationToken = default)
    {
        if (!await context.Users.AnyAsync(
                u => u.Role == UserRole.Admin,
                cancellationToken))
        {
            var admin = new User
            {
                Name = "Admin",
                Email = "admin@admin.com",
                Role = UserRole.Admin
            };
            
            admin.Password = passwordHasher.Hash( "Admin123");

            context.Users.Add(admin);
        }

        if (!await context.Users.AnyAsync(
                u => u.Role == UserRole.SuperAdmin,
                cancellationToken))
        {
            var superAdmin = new User
            {
                Name = "Super Admin",
                Email = "superadmin@admin.com",
                Role = UserRole.SuperAdmin
            };
            
            superAdmin.Password = passwordHasher.Hash("SuperAdmin123");

            context.Users.Add(superAdmin);
        }

        await context.SaveChangesAsync(cancellationToken);
    }
}
