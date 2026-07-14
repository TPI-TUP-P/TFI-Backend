using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequest request);

    Task<LoginResponse> LoginAsync(LoginRequest request);
}