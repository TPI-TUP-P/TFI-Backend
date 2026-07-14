using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class UserRepository(AppDbContext context) : IUserRepository
{
    // private readonly AppDbContext _context;
    // public UserRepository(AppDbContext context)
    // {
    //     _context = context;
    // }


    public async Task<User?> GetByIdAsync(Guid id)
    {
        var user = await context.Users.FindAsync(id);
        return user;
    }

    public async Task<User> AddAsync(User user)
    {
        var userCreated = await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        return userCreated.Entity;
    }

    public async Task<User> UpdateAsync(User user)
    {
        var userToUpdate = await context.Users.FindAsync(user.Id);
        userToUpdate!.Name = user.Name;
        userToUpdate.LastName = user.LastName;
        userToUpdate.Email = user.Email;
        userToUpdate.Password = user.Password;

        await context.SaveChangesAsync();
        return user;
        
    }

    public  Task DeleteAsync(User user)
    {
        user.Delete();
        return Task.CompletedTask;
        
    }

   public async Task<User?> GetByEmailAsync(string email)
    {
        var user = await context.Users.FirstOrDefaultAsync(s => s.Email == email);
        return user;
    }




}