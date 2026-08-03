using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;

using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Repositories;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Domain.interfaces;
using Infrastructure.Services.Storage;


namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IPasswordHasherService, PasswordHasherService>();
        services.AddScoped<IPublicationService, PublicationService>();
        services.AddScoped<IPublicationRepository, PublicationRepository>();
        services.AddScoped<ICalificationService, CalificationService>();
        services.AddScoped<ICalificationRepository, CalificationRepository>();
        services.AddScoped<IPostulationService, PostulationService>();
        services.AddScoped<IPostulationRepository, PostulationRepository>();
        services.AddScoped<IStorageService, SupabaseStorageService>();
        




        return services;
    }
}