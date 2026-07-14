using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;
using Domain.Interfaces;

public class AuthService(IUserRepository userRepository) : IAuthService
{
    public Task<RegisterResponse> Register(RegisterRequest request) 
    {
        
    }

    public Task<LoginResponse> Login (LoginRequest request)
    {
        
    }
}