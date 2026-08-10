using Domain.Entities;


namespace Domain.Interfaces;

public interface IPublicationRepository : IGenericRepository<Publication>
{
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken);

    Task<List<Publication>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken);

    Task<List<Publication>> GetAllByCreatorAsync(Guid creatorId, int page, int pageSize, CancellationToken cancellationToken);

    Task<int> CountByCreatorAsync(Guid creatorId, CancellationToken cancellationToken);
}