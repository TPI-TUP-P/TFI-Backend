// Domain/Interfaces/IGenericRepository.cs
namespace Domain.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<T> AddAsync(T entity, CancellationToken cancellationToken);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}