using Application.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace Infrastructure.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger) : IEmailService
{
    public async Task SendPasswordResetEmailAsync(string toEmail, string resetToken)
    {
        var host = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Host"])
            ? configuration["EmailSettings:Host"]
            : configuration["EmailSettings:SmtpServer"];

        var portStr = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Port"])
            ? configuration["EmailSettings:Port"]
            : "587";

        var username = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Username"])
            ? configuration["EmailSettings:Username"]
            : configuration["EmailSettings:SenderEmail"];

        var rawPassword = configuration["EmailSettings:Password"];
        var password = !string.IsNullOrWhiteSpace(rawPassword) ? rawPassword.Replace(" ", "").Trim() : null;

        var fromEmail = !string.IsNullOrWhiteSpace(configuration["EmailSettings:From"])
            ? configuration["EmailSettings:From"]
            : (!string.IsNullOrWhiteSpace(configuration["EmailSettings:SenderEmail"]) ? configuration["EmailSettings:SenderEmail"] : "noreply@whojobs.com");

        var senderName = !string.IsNullOrWhiteSpace(configuration["EmailSettings:SenderName"])
            ? configuration["EmailSettings:SenderName"]
            : "Who Jobs";

        var clientAppUrl = configuration["ClientAppUrl"] ?? "http://localhost:5173";

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            var resetLink = $"{clientAppUrl}/reset-password?token={resetToken}";
            logger.LogWarning("SMTP configuration is missing or incomplete (check Host/SmtpServer, Username/SenderEmail, Password). Logging password reset link to console:");
            logger.LogWarning("Password reset link for {Email}: {ResetLink}", toEmail, resetLink);
            return;
        }

        int port = int.TryParse(portStr, out int parsedPort) ? parsedPort : 587;
        var resetUrl = $"{clientAppUrl}/reset-password?token={resetToken}";

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(senderName, fromEmail));
        message.To.Add(new MailboxAddress("", toEmail));
        message.Subject = "Recuperación de contraseña - Who Jobs";

        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <h2>Recuperación de contraseña</h2>
                    <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para crear una nueva:</p>
                    <p style='margin: 24px 0;'>
                        <a href='{resetUrl}' style='background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>
                            Restablecer Contraseña
                        </a>
                    </p>
                    <p>O copia y pega el siguiente enlace en tu navegador:</p>
                    <p><a href='{resetUrl}'>{resetUrl}</a></p>
                    <p style='color: #6b7280; font-size: 14px; margin-top: 24px;'>Si no solicitaste este cambio, puedes ignorar este correo con tranquilidad.</p>
                    <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;' />
                    <p style='color: #9ca3af; font-size: 12px;'>El equipo de Who Jobs.</p>
                </div>"
        };
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        try
        {
            var socketOptions = port == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls;
            await client.ConnectAsync(host, port, socketOptions);

            await client.AuthenticateAsync(username, password);

            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            logger.LogInformation("Password reset email successfully sent to {Email}", toEmail);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send password reset email to {Email}", toEmail);
            throw;
        }
    }
    public async Task SendReactivationEmailAsync(string toEmail, string resetToken)
{
    var host = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Host"]) ? configuration["EmailSettings:Host"] : configuration["EmailSettings:SmtpServer"];
    var portStr = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Port"]) ? configuration["EmailSettings:Port"] : "587";
    var username = !string.IsNullOrWhiteSpace(configuration["EmailSettings:Username"]) ? configuration["EmailSettings:Username"] : configuration["EmailSettings:SenderEmail"];
    var rawPassword = configuration["EmailSettings:Password"];
    var password = !string.IsNullOrWhiteSpace(rawPassword) ? rawPassword.Replace(" ", "").Trim() : null;
    var fromEmail = !string.IsNullOrWhiteSpace(configuration["EmailSettings:From"]) ? configuration["EmailSettings:From"] : (!string.IsNullOrWhiteSpace(configuration["EmailSettings:SenderEmail"]) ? configuration["EmailSettings:SenderEmail"] : "noreply@whojobs.com");
    var senderName = !string.IsNullOrWhiteSpace(configuration["EmailSettings:SenderName"]) ? configuration["EmailSettings:SenderName"] : "Who Jobs";
    var clientAppUrl = configuration["ClientAppUrl"] ?? "http://localhost:5173";

    if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
    {
        var resetLink = $"{clientAppUrl}/reactivate?token={resetToken}";
        logger.LogWarning("SMTP configuration is missing. Logging account reactivation link to console: {ResetLink}", resetLink);
        return;
    }

    int port = int.TryParse(portStr, out int parsedPort) ? parsedPort : 587;
    var reactivationUrl = $"{clientAppUrl}/reactivate?token={resetToken}";

    var message = new MimeMessage();
    message.From.Add(new MailboxAddress(senderName, fromEmail));
    message.To.Add(new MailboxAddress("", toEmail));
    message.Subject = "Reactivar tu cuenta - Who Jobs";

    var bodyBuilder = new BodyBuilder
    {
        HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h2>¡Hola de nuevo!</h2>
                <p>Notamos que intentaste registrarte con este correo, pero ya tenías una cuenta que fue dada de baja temporalmente.</p>
                <p>Si querés recuperar tu cuenta y volver a usar la plataforma, haz clic en el siguiente botón:</p>
                <p style='margin: 24px 0;'>
                    <a href='{reactivationUrl}' style='background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>
                        Reactivar mi cuenta
                    </a>
                </p>
                <p>O copia y pega el siguiente enlace en tu navegador:</p>
                <p><a href='{reactivationUrl}'>{reactivationUrl}</a></p>
                <p style='color: #6b7280; font-size: 14px; margin-top: 24px;'>Este enlace expirará en 1 hora. Si no solicitaste esto, puedes ignorar este correo.</p>
                <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;' />
                <p style='color: #9ca3af; font-size: 12px;'>El equipo de Who Jobs.</p>
            </div>"
    };
    message.Body = bodyBuilder.ToMessageBody();

    using var client = new MailKit.Net.Smtp.SmtpClient();
    try
    {
        var socketOptions = port == 465 ? MailKit.Security.SecureSocketOptions.SslOnConnect : MailKit.Security.SecureSocketOptions.StartTls;
        await client.ConnectAsync(host, port, socketOptions);
        await client.AuthenticateAsync(username, password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);

        logger.LogInformation("Reactivation email successfully sent to {Email}", toEmail);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to send reactivation email to {Email}", toEmail);
        throw;
    }
}
}

