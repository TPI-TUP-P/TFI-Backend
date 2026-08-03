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


}