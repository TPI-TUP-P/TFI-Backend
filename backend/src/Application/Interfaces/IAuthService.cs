using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;
namespace Application.Interfaces;
public interface IAuthService
{
    Task<RegisterResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken);

    Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken);
    
    Task ForgotPasswordAsync(ForgotPasswordRequest request, CancellationToken cancellationToken);
    
    Task ResetPasswordAsync(ResetPasswordRequest request, CancellationToken cancellationToken);
}