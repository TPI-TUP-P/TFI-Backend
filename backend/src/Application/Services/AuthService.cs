using Application.DTOs.Auth.Request;
using Application.DTOs.Auth.Response;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;

namespace Application.Services;

public class AuthService(IUserRepository userRepository, IJwtService jwtService, IPasswordHasherService passwordHasher, IEmailService emailService) : IAuthService
{
    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
    {

        var existingEmail = await userRepository.GetByEmailWithDeletedUsersAsync(request.Email, cancellationToken);
        if (existingEmail != null)
        {
            if (existingEmail.IsActive == false)
            {
                existingEmail.GeneratePasswordResetToken();

                await userRepository.UpdateAsync(existingEmail, cancellationToken);
                await emailService.SendReactivationEmailAsync(existingEmail.Email, existingEmail.ResetToken!);

                throw new BadRequestException("Hemos detectado que tu cuenta estaba dada de baja. Revisa tu correo, te enviamos un enlace para reactivarla.");
            }
            throw new EmailAlredyExistsException();
        }

        var existingPhone = await userRepository.GetByPhoneAsync(request.Phone, cancellationToken);
        if (existingPhone != null)
        {
            throw new EmailAlredyExistsException();
        }

        var passwordHash = passwordHasher.Hash(request.Password);
        var user = new User(
            name: request.Name,
            email: request.Email,
            password: passwordHash,
            lastName: request.LastName,
            phone: request.Phone,
            role: request.Role
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
    public async Task ReactivateAccountAsync(string token, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByResetTokenAsync(token, cancellationToken);

        if (user == null || !user.ValidateResetToken(token))
        {
            throw new BadRequestException("El enlace de reactivación es inválido o ha expirado.");
        }

        user.Active();

        user.ResetToken = null;
        user.ResetTokenExpires = null;

        await userRepository.UpdateAsync(user, cancellationToken);
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailWithDeletedUsersAsync(request.Email, cancellationToken);
        if (user == null)
        {
            throw new InvalidCredentialsException();
        }

        bool isEquals = passwordHasher.ComparePassword(request.Password, user.Password);
        if (isEquals == false)
        {
            throw new InvalidCredentialsException();
        }
        var token = jwtService.GenerateToken(user);
        return new LoginResponse
        {
            Token = token,
            UserId = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role,
        };
    }

    public async Task ForgotPasswordAsync(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (user == null)
        {
            return;
        }

        if (user.IsActive == false)
        {
            user.GeneratePasswordResetToken();

            await userRepository.UpdateAsync(user, cancellationToken);
            await emailService.SendReactivationEmailAsync(user.Email, user.ResetToken!);

            throw new BadRequestException("Hemos detectado que tu cuenta estaba dada de baja. Revisa tu correo, te enviamos un enlace para reactivarla.");
        }

        user.GeneratePasswordResetToken();
        await userRepository.UpdateAsync(user, cancellationToken);

        await emailService.SendPasswordResetEmailAsync(user.Email, user.ResetToken!);
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByResetTokenAsync(request.Token, cancellationToken);

        if (user == null || !user.ValidateResetToken(request.Token))
        {
            throw new Exception("Invalid or expired reset token.");
        }

        var newPasswordHash = passwordHasher.Hash(request.NewPassword);
        user.UpdatePassword(newPasswordHash);

        await userRepository.UpdateAsync(user, cancellationToken);
    }
}