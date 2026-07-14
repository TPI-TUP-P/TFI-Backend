namespace Application.DTOs.Auth.Response;

using Domain.Enums;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;

    public Guid UserId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public UserRole Role { get; set; }
}