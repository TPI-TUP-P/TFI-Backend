namespace Domain.Exceptions;
public  class PhoneAlredyExistsException : DomainException
{
    public PhoneAlredyExistsException() : base("The phone number is already registered.") {}
    public PhoneAlredyExistsException(string phone) : base($"The phone number {phone} is already registered. "){}
}