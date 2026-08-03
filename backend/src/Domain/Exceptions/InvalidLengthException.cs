// using Domain.Exceptions;
namespace Domain.Exceptions;
public class InvalidLegthException : DomainException
{
    public InvalidLegthException(string entityName, int n) : base($"{entityName} number must be at least {n} characters long.") {}
    public InvalidLegthException(int n1, int n2, string entityName) : base($"{entityName} must be between {n1} and {n2} characters") {}
}