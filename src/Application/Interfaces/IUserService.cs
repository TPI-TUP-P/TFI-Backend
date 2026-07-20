using Application.DTOs.User.Request;
using Application.DTOs.User.Response;
using Domain.Enums;

namespace Application.Interfaces.Services;

public interface IUserService
{
    Task<GetByIdResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    // Task<IEnumerable<UserResponse>> GetAllAsync();

    Task<GetByIdResponse> CreateAsync(CreateRequest request, CancellationToken cancellationToken);

    Task<GetByIdResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(Guid idTarget, Guid id, UserRole role,CancellationToken cancellationToken);
}