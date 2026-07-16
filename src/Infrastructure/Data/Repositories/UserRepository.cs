using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Data.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    // private readonly AppDbContext _context;
    // public UserRepository(AppDbContext context)
    // {
    //     _context = context;
    // }


    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var user = await context.Users.FindAsync(id, cancellationToken);
        return user;
    }

    public async Task<User> AddAsync(User user, CancellationToken cancellationToken)
    {
        var userCreated = await context.Users.AddAsync(user);
        await context.SaveChangesAsync(cancellationToken);
        return userCreated.Entity;
    }

    public async Task<User> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        var userToUpdate = await context.Users.FindAsync(user.Id, cancellationToken );
        userToUpdate!.Name = user.Name;
        userToUpdate.LastName = user.LastName;
        userToUpdate.Email = user.Email;
        userToUpdate.Password = user.Password;

        await context.SaveChangesAsync(cancellationToken);
        return user;
        
    }

    public  Task DeleteAsync(User user, CancellationToken cancellationToken)
    {
        user.Delete();
        return Task.CompletedTask;
        
    }

   public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var user = await context.Users.FirstOrDefaultAsync(s => s.Email == email, cancellationToken);
        return user;
    }




}