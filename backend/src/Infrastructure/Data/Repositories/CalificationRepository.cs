using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CalificationRepository(AppDbContext context) : ICalificationRepository

{
    public async Task<Calification?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var calification = await context.Califications.FindAsync(id, cancellationToken);
        return calification;
    }

    public async Task<Calification?> GetByQualifierAndQualifiedAsync(Guid idQualifier, Guid idQualified, CancellationToken cancellationToken)
    {
        return await context.Califications
            .FirstOrDefaultAsync(c => c.IdQualifier == idQualifier && c.IdQualified == idQualified, cancellationToken);
    }

    public async Task<(double Average, int Count)> GetAverageAndCountAsync(Guid idQualified, CancellationToken cancellationToken)
    {
        var scores = await context.Califications
            .Where(c => c.IdQualified == idQualified)
            .Select(c => c.Score)
            .ToListAsync(cancellationToken);

        if (scores.Count == 0) return (0, 0);

        return (scores.Average(), scores.Count);
    }

    public async Task<Calification> AddAsync(Calification calification, CancellationToken cancellationToken)
    {
        var calificationcreated = await context.Califications.AddAsync(calification, cancellationToken);
        await context.SaveChangesAsync();
        return calificationcreated.Entity;
    }

    public async Task<Calification> UpdateAsync(Calification calification, CancellationToken cancellationToken)
    {
        var calificationToUpdate = await context.Califications.FindAsync(calification.Id);
        calificationToUpdate!.Score = calification.Score;

        await context.SaveChangesAsync();
        return calification;

    }

    public async Task DeleteAsync(Calification calification, CancellationToken cancellationToken)
    {
        calification.Delete();
        await context.SaveChangesAsync();

    }


}