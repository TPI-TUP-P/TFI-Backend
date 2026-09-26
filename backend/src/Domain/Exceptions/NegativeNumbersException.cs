namespace Domain.Exceptions;

public class NegativeNumbersException : DomainException
{
    public NegativeNumbersException() : base("The number cannot be negative.") { }
}