namespace Application.DTOs.Auth.Response;

using Domain.Enums;

public class RegisterResponse
{
    public Guid UserId { get; set; }

    public required string Name { get; set; } = string.Empty;

    public required string LastName { get; set; } = string.Empty;

    public required string Email { get; set; } = string.Empty;

    public required string Phone { get; set; }

    public UserRole Role { get; set; }

    public DateTime CreatedDate { get; set; }
}