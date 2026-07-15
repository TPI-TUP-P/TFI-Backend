using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;

public class AuthService(IUserRepository userRepository,IJwtService jwtService, IPasswordHasherService passwordHasher) : IAuthService
{
    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
    {

        var existingEmail = await userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (existingEmail != null)
        {
            throw new Exception("This email address already exists.");
        }
        var passwordHash = passwordHasher.Hash(request.Password);
        var user = new User(
            email: request.Email,
            password: passwordHash,
            name: request.Name,
            lastName: request.LastName,
            phone: request.Phone,
            role: UserRole.Candidate
        );
        await userRepository.AddAsync(user, cancellationToken);


        return new RegisterResponse
        {
            UserId = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            CreatedDate = user.CreatedDate
        };


    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(request.Email,cancellationToken );
        if(user == null)
        {
            throw new Exception("incorrect credentials");
        }

        bool isEquals =  passwordHasher.ComparePassword(request.Password, user.Password);
        if(isEquals == false)
        {
            throw new Exception("incorrect credentials");
        }
        var token = jwtService.GenerateToken(user);
        return new LoginResponse
        {
            Token = token,
            UserId = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role
        };
    }
}