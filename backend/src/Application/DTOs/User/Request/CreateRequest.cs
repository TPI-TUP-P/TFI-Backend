namespace Application.DTOs.User.Request;

public class CreateRequest
{
    public required string Name { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
    public required string Email { get; set; } = string.Empty;
    public required string Password { get; set; } = string.Empty;
    public required string Phone { get; set; }

}