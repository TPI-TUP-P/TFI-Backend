using Domain.Entities;


namespace Domain.Interfaces;

public interface IPublicationRepository : IGenericRepository<Publication>
{
    Task<Publication> GetByIdAsync(Guid Id, CancellationToken cancellationToken);

    Task<Publication> AddAsync(Publication publication, CancellationToken cancellationToken);
}