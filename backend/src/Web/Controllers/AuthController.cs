
namespace Web.Controllers;

using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.RegisterAsync(request, cancellationToken);
        return Ok(result);
    }
    [HttpPost("login")]
    public async Task<ActionResult<RegisterResponse>> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.LoginAsync(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        await authService.ForgotPasswordAsync(request, cancellationToken);
        return Ok(new { message = "Si el correo está registrado, se enviara un enlace de recuperacion." });
    }
    [HttpPost("reactivate")]
    public async Task<IActionResult> ReactivateAccount([FromBody] ReactivateRequest request, CancellationToken cancellationToken)
    {
        await authService.ReactivateAccountAsync(request.Token, cancellationToken);
        return Ok(new { Message = "¡Cuenta reactivada con éxito! Ya puedes iniciar sesión." });
    }
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await authService.ResetPasswordAsync(request, cancellationToken);
            return Ok(new { message = "Contraseña restablecida exitosamente." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
