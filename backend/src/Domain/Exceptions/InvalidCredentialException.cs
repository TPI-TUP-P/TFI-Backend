
namespace Domain.Exceptions;
public  class InvalidCredentialsException : DomainException
{
    public InvalidCredentialsException () : base ("Incorrect email or password") {}
}