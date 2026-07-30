using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Configurations;
using Application.Interfaces;
using Infrastructure.Services.Storage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(
        builder.Configuration["JWT_SECRET_KEY"]
        ?? builder.Configuration["Jwt:Key"]
        ?? throw new InvalidOperationException("JWT Key not found")))
        };
        
        //para ver error
        
    });

builder.Services.AddAuthorization();

builder.Services.Configure<SupabaseOptions>(
builder.Configuration.GetSection(SupabaseOptions.Section));

builder.Services.AddHttpClient();

builder.Services.AddScoped<IStorageService, SupabaseStorageService>();

var app = builder.Build();



// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{

//app.MapOpenApi();
//app.UseSwagger();
//app.UseSwaggerUI();
//}
// Run migrations automatically
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseDeveloperExceptionPage();


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
