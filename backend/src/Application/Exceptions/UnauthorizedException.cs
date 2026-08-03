// using Application.Exceptions;
namespace Application.Exceptions;
public class UnauthorizedException : BaseApplicationException
{
    public UnauthorizedException() :base("Unauthorized request. Missing required identifier") {}
    public UnauthorizedException(string entityName) : base($"Authentication required to access {entityName}"){} 
}