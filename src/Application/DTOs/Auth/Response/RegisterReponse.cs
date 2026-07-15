namespace Application.DTOs.Auth.Response;

using Domain.Enums;

public class RegisterResponse
{
    public Guid UserId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public UserRole Role { get; set; }

    public DateTime CreatedDate { get; set; }
}