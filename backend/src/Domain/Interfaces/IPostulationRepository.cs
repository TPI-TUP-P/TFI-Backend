
using Domain.Entities;

namespace Domain.interfaces
{
    public interface IPostulationRepository
    {   
        Task<Postulation> Create(Postulation postulation, CancellationToken cancellationToken);
        Task<Postulation?> GetById(Guid id, CancellationToken cancellationToken);
        Task<List<Postulation>> GetAll(CancellationToken cancellationToken);
        Task<Postulation> Update(Postulation postulation, CancellationToken cancellationToken);
        Task Delete(Guid id, CancellationToken cancellationToken);
        Task<bool> ExistsAsync(Guid userId, Guid jobOfferId, CancellationToken cancellationToken);
    }
}