using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Domain.DTOs;
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
    public async Task<PublicationCountDto> GetCountAsync(
    CancellationToken cancellationToken)
    {
        var result = await context.Publications
            .GroupBy(p => 1)
            .Select(g => new PublicationCountDto(
                g.Count(),
                g.Count(p => p.State)
            ))
            .FirstOrDefaultAsync(cancellationToken);

        return result ?? new PublicationCountDto(0, 0);
    }
    public async Task<int> CountVisibleByCreatorAsync(
    Guid creatorId,
    CancellationToken cancellationToken)
    {
        return await context.Publications
            .CountAsync(
                p => p.Creator == creatorId && p.State,
                cancellationToken);
    }

    public async Task<PagedResult<Publication>> GetAllAsync(
    int page,
    int pageSize,
    string? search,
    CancellationToken cancellationToken)
    {
        var query = context.Publications
            .AsNoTracking()
            .Where(p => p.State);


        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim().ToLower();

            query = query.Where(p =>
                p.Job_position.ToLower().Contains(search));
        }
        var totalItems = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(p => p.Created_Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<Publication>
        {
            Items = items,
            TotalItems = totalItems,
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
            CurrentPage = page,
            PageSize = pageSize
        };
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
        var oneMonthAgo = DateTime.UtcNow.AddMonths(-1);

        return await context.Publications
            .AsNoTracking()
            .Where(p =>
                p.Creator == creatorId &&
                (
                    p.State ||
                    p.Created_Date >= oneMonthAgo
                )
            )
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



    public async Task<List<Publication>> SearchByNameAsync(
        string name,
        int page,
        int pageSize,
        CancellationToken cancellationToken)
    {
        return await context.Publications
            .AsNoTracking()
            .Where(p => p.State &&
                        p.Job_position != null &&
                        p.Job_position.Contains(name))
            .OrderByDescending(p => p.Created_Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }


}