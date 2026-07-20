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