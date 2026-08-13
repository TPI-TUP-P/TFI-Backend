
using Domain.Entities;
using Domain.DTOs;


namespace Domain.interfaces
{
    public interface IPostulationRepository
    {   
        Task<Postulation> Create(Postulation postulation, CancellationToken cancellationToken);
        Task<Postulation?> GetById(Guid id, CancellationToken cancellationToken);
        Task<int> GetCountByUserId(Guid userId, CancellationToken cancellationToken);
        Task<List<Postulation>> GetByUserId(Guid userId, CancellationToken cancellationToken);
        Task<List<Postulation>> GetByJobOfferId(Guid jobOfferId, CancellationToken cancellationToken);
        Task<Postulation> UpdateState(Postulation postulation, CancellationToken cancellationToken);
        Task Delete(Guid id, CancellationToken cancellationToken);
        Task<bool> ExistsAsync(Guid userId, Guid jobOfferId, CancellationToken cancellationToken);
    }
}