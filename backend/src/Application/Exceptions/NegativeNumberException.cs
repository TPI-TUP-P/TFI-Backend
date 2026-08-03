namespace Application.Exceptions;

public class NegativeNumberException : BaseApplicationException
{
    public NegativeNumberException() : base("Negative numbers are not accepted.") { }
    public NegativeNumberException(string entityName) : base($"Negative numbers are not accepted at {entityName}.") { }
}