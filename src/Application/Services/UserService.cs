using Application.DTOs.User.Request;
using Application.DTOs.User.Response;
// using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class UserService(IUserRepository _userRepository) : IUserService
{
    // private readonly IUserRepository _userRepository;

    // public UserService(IUserRepository userRepository)
    // {
    //     _userRepository = userRepository;
    // }

    public async Task<GetByIdResponse> GetByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
        {
            throw new Exception("User not found.");
        }

        return new GetByIdResponse
        {
            Id = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            CreatedDate = user.CreatedDate
        };
    }

    public async Task<GetByIdResponse> CreateAsync(CreateRequest request)
    {
        var user = new User(
            request.Name,
            request.LastName,
            request.Phone,
            request.Email,
            request.Password,
            UserRole.Candidate);

        await _userRepository.AddAsync(user);
        // await _userRepository.SaveChangesAsync();

        return new GetByIdResponse
        {
            Id = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            CreatedDate = user.CreatedDate
        };
    }

    public async Task<GetByIdResponse> UpdateAsync(Guid id, UpdateRequest request)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
        {
            throw new Exception("User not found.");
        }

        if (request.Name != null)
        {
            user.Name = request.Name;
        }
        if (request.LastName != null)
        {
            user.LastName = request.LastName;
        }

        if (request.Phone != null)
        {
            user.Phone = request.Phone;
        }
      
        await _userRepository.UpdateAsync(user);
        // await _userRepository.SaveChangesAsync();

        return new GetByIdResponse
        {
            Id = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            CreatedDate = user.CreatedDate
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
        {
            throw new Exception("User not found.");
        }

        user.Delete();

        // await _userRepository.SaveChangesAsync();
    }
}