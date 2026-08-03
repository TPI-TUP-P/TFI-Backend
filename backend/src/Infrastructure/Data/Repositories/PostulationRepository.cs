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

        // para validar si ya se postulo a la oferta de trabajo, para no permitir que se postule dos veces a la misma oferta
        public async Task<bool> ExistsAsync(Guid userId, Guid jobOfferId, CancellationToken cancellationToken)
        {
            return await _context.Postulations.AnyAsync(p => p.UserId == userId && p.JobOfferId == jobOfferId, cancellationToken);
        }
    }
}