namespace Application.Exceptions;

public class BadRequestException : BaseApplicationException
{
    public BadRequestException()
        : base("The request is invalid.") { }

    public BadRequestException(string entityName)
        : base($"The request is invalid at {entityName}.") { }
}