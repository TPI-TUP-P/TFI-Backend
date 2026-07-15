using Application.DTOs.User.Request;
using Application.DTOs.User.Response;

namespace Application.Interfaces.Services;

public interface IUserService
{
<<<<<<< HEAD
    Task<GetByIdResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    // Task<IEnumerable<UserResponse>> GetAllAsync();

    Task<GetByIdResponse> CreateAsync(CreateRequest request, CancellationToken cancellationToken);

    Task<GetByIdResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(Guid id, CancellationToken cancellationToken);
=======
    Task<GetByIdResponse> GetByIdAsync(Guid id);

    // Task<IEnumerable<UserResponse>> GetAllAsync();

    Task<GetByIdResponse> CreateAsync(CreateRequest request);

    Task<GetByIdResponse> UpdateAsync(Guid id, UpdateRequest request);

    Task DeleteAsync(Guid id);
>>>>>>> 1eb6089240aa1f2384b6350dcb7a301348bd7fa9
}