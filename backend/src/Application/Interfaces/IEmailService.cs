namespace Application.Interfaces;

public interface IEmailService
{
 Task SendReactivationEmailAsync(string toEmail, string resetToken);
    Task SendPasswordResetEmailAsync(string toEmail, string resetToken);
}

