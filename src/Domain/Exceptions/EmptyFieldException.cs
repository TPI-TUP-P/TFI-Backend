namespace Domain.Exceptions;

public class EmptyFieldException : DomainException
{
    public EmptyFieldException(string Field) : base($"the field {Field} is empty.") { }
}