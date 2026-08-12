using Domain.Enums;

namespace Application.DTOs.User.Response;

public class GetByIdResponse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public UserRole Role { get; set; }

    public DateTime CreatedDate { get; set; }
    public string? CvFileName { get; set; }

    public string? CvFilePath { get; set; }
}