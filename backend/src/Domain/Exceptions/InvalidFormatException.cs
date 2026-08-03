namespace Domain.Exceptions;

public class InvalidFormatException : DomainException
{
    public InvalidFormatException(string field)
        : base($"{field} has an invalid format.")
    {
    }
}