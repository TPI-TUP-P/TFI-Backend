using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class PublicationRepository(AppDbContext context) : IPublicationRepository

{
    public async Task<Publication?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var publication = await context.Publications.FindAsync(id, cancellationToken);
        return publication!;
    }

    public async Task<Publication> AddAsync(Publication publication, CancellationToken cancellationToken)
    {
        var publicationcreated = await context.Publications.AddAsync(publication, cancellationToken);
        await context.SaveChangesAsync();
        return publicationcreated.Entity;
    }

    public async Task<Publication> UpdateAsync(Publication publication, CancellationToken cancellationToken)
    {
        var publicationToUpdate = await context.Publications.FindAsync(publication.Id);
        publicationToUpdate!.Job_position = publication.Job_position;
        publicationToUpdate.Description = publication.Description;
        publicationToUpdate.Salary = publication.Salary;
        publicationToUpdate.Applicants = publication.Applicants;

        await context.SaveChangesAsync();
        return publication;

    }

    public async Task DeleteAsync(Publication publication, CancellationToken cancellationToken)
    {
        publication.Delete();
        await context.SaveChangesAsync();

    }

    public async Task<List<Publication>> GetAllAsync(
    int page,
    int pageSize,
    CancellationToken cancellationToken)
    {
        return await context.Publications
            .AsNoTracking()
            .OrderByDescending(p => p.Created_Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }
    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken)
    {
        return await context.Publications
            .AnyAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<List<Publication>> GetAllByCreatorAsync(
    Guid creatorId,
    int page,
    int pageSize,
    CancellationToken cancellationToken)
    {
        return await context.Publications
            .AsNoTracking()
            .Where(p => p.Creator == creatorId)
            .OrderByDescending(p => p.Created_Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> CountByCreatorAsync(
    Guid creatorId,
    CancellationToken cancellationToken)
    {
        return await context.Publications
            .CountAsync(p => p.Creator == creatorId, cancellationToken);
    }

    public async Task<List<Publication>> SearchByNameAsync(string name, int page, int pageSize, CancellationToken cancellationToken)
    {
        return await context.Publications
            .AsNoTracking()
            .Where(p => p.Job_position != null &&
                        p.Job_position.Contains(name))
            .OrderByDescending(p => p.Created_Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }


}