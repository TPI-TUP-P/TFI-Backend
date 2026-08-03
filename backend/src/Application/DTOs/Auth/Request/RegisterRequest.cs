using Domain.Enums;

namespace Application.DTOs.Auth.Request;


public class RegisterRequest
{
    public required string Name { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
    public required string Email { get; set; } = string.Empty;
    public required string Password { get; set; } = string.Empty;
    public required string Phone { get; set; }
    public required UserRole Role {get;set;}
}