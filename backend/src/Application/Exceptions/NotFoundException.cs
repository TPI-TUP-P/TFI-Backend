namespace Application.Exceptions;
public  class NotFoundException : BaseApplicationException
{
    public NotFoundException(): base("No results found") {}
    public NotFoundException(string entityName) : base($"{entityName} not found") {}
}