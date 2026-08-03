// using Domain.Exceptions;
namespace Domain.Exceptions;

public class FieldEmptyException : DomainException
{
    public FieldEmptyException(string field)
    : base($"{field} cannot be empty.")
    {
    }
}