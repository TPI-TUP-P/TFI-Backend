// Domain/Interfaces/IUserRepository.cs
using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    Task<(IReadOnlyList<User> Users, int TotalCount)> GetAllAsync(
           UserRole? role,
           bool includeDeleted,
           CancellationToken cancellationToken); 
    Task<User?> GetByPhoneAsync(string phone, CancellationToken cancellationToken);
    Task<User?> GetByEmailWithDeletedUsersAsync(string email, CancellationToken cancellationToken);
    Task<User?> GetByResetTokenAsync(string token, CancellationToken cancellationToken);
}