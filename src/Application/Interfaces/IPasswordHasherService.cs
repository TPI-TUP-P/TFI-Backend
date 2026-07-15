public interface IPasswordHasherService
{
    string Hash (string password);
    bool ComparePassword (string password, string passwordHashed);
}