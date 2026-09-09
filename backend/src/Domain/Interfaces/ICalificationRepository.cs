using Domain.Entities;


namespace Domain.Interfaces;

public interface ICalificationRepository : IGenericRepository<Calification>
{
    Task<Calification?> GetByQualifierAndQualifiedAsync(Guid idQualifier, Guid idQualified, CancellationToken cancellationToken);

    Task<(double Average, int Count)> GetAverageAndCountAsync(Guid idQualified, CancellationToken cancellationToken);
}