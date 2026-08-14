using Domain.Enums;

namespace Application.DTOs.User.Response;
public record GetAllResponse(
    Guid Id,
    string Name,
    string Email,
    UserRole Role
);