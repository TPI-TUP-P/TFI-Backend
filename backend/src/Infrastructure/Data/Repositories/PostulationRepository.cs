namespace Infrastructure.Data.Repositories
{
    using Infrastructure.Data;
    using Domain.Entities;
    using Domain.interfaces;
    using Microsoft.EntityFrameworkCore;

    public class PostulationRepository : IPostulationRepository
    {
        private readonly AppDbContext _context;

        public PostulationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Postulation> Create(Postulation postulation, CancellationToken cancellationToken)
        {
            await _context.Postulations.AddAsync(postulation, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return postulation;
            
        }

        public async Task<Postulation?> GetById(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Postulations.FindAsync(id, cancellationToken);
        }


        public async Task<Postulation> Update(Postulation postulation, CancellationToken cancellationToken)
        {
            _context.Postulations.Update(postulation);
            await _context.SaveChangesAsync(cancellationToken);
            return postulation;
        }

        public async Task<List<Postulation>> GetAll(CancellationToken cancellationToken)
        {
            return await _context.Postulations.ToListAsync(cancellationToken);
        }

        public async Task Delete(Guid id, CancellationToken cancellationToken)
        {
            var postulation = await _context.Postulations.FindAsync(id, cancellationToken);
            if (postulation != null)
            {
                _context.Postulations.Remove(postulation);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}