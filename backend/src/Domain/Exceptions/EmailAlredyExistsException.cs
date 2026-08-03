namespace Domain.Exceptions;
public  class EmailAlredyExistsException : DomainException
{
    public EmailAlredyExistsException() : base("The email address  is already registered.") {}
    public EmailAlredyExistsException(string email) : base($"The email address {email} is already registered. "){}
}