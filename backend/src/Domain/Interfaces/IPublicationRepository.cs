using Domain.DTOs;
using Domain.Entities;
using Domain.interfaces;



namespace Domain.Interfaces;

public interface IPublicationRepository : IGenericRepository<Publication>
{
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken);

    Task<PagedResult<Publication>> GetAllAsync(int page, int pageSize, string? search, CancellationToken cancellationToken);

    Task<List<Publication>> GetAllByCreatorAsync(Guid creatorId, int page, int pageSize, CancellationToken cancellationToken);

    Task<int> CountByCreatorAsync(Guid creatorId, CancellationToken cancellationToken);

    Task<List<Publication>> SearchByNameAsync(string name, int page, int pageSize, CancellationToken cancellationToken);

    Task<PublicationCountDto> GetCountAsync(CancellationToken cancellationToken);

    Task<int> CountVisibleByCreatorAsync(Guid creatorId, CancellationToken cancellationToken);
}