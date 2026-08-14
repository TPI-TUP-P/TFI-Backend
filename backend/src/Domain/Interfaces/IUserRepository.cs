// Domain/Interfaces/IUserRepository.cs
using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    Task<IEnumerable<User?>> GetAllAsync(UserRole? userRole, CancellationToken cancellationToken);
    Task<User?> GetByPhoneAsync(string phone, CancellationToken cancellationToken);
}