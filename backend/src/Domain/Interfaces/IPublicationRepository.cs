using Domain.Entities;


namespace Domain.Interfaces;

public interface IPublicationRepository : IGenericRepository<Publication>
{
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken);
}