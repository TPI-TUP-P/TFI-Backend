using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Interfaces;

public interface IPublicationRepository : IRepository<Publication>
{
    new Task<Publication> GetById(Guid Id, CancellationToken cancellationToken);
}