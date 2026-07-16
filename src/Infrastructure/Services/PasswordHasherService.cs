using Application.Interfaces;

namespace Infrastructure.Services;

public class PasswordHasherService :IPasswordHasherService 
{
    public string Hash(string password)
    {
        var passwordHashed = BCrypt.Net.BCrypt.EnhancedHashPassword(password, workFactor: 11);
        return passwordHashed;
    }

    public bool ComparePassword (string password, string passwordHashed)
    {
        return BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHashed);
    }
}