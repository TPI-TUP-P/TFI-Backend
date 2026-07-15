using Application.DTOs.User.Request;
using Application.DTOs.User.Response;

namespace Application.Interfaces.Services;

public interface IUserService
{
    Task<GetByIdResponse> GetByIdAsync(Guid id);

    // Task<IEnumerable<UserResponse>> GetAllAsync();

    Task<GetByIdResponse> CreateAsync(CreateRequest request);

    Task<GetByIdResponse> UpdateAsync(Guid id, UpdateRequest request);

    Task DeleteAsync(Guid id);
}