namespace Application.Exceptions;

public class OutRangeException : BaseApplicationException
{
    public OutRangeException() : base("The value is out of range.") { }
    public OutRangeException(string entityName) : base($"The value is out of range at {entityName}.") { }
}