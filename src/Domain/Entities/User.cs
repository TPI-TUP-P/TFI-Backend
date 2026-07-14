namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

    public bool IsActive {get; private set;}
    public UserRole Role { get; set; }
    public DateTime CreatedDate { get; set; }



    private User(string name, string lastName, string phone, string email, string password, UserRole role)
    {
        ValidateProperties(name, lastName, phone, email, password);
        Id = Guid.NewGuid();
        Name = name;
        LastName = lastName;
        Password = password;
        Email = email;
        Phone = phone;
        Role = role;
        CreatedDate = DateTime.UtcNow;
    }

    public void Delete()
{
    IsActive = false;
}

    public User() { }

    private static void ValidateProperties(string name, string lastName, string phone, string email, string password)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new Exception("The name cannot be empty.");
        }
        else if (name.Length < 3 || name.Length > 100)
        {
            throw new Exception("Name must be between 3 and 100 characters long");
        }


        if (string.IsNullOrWhiteSpace(lastName))
        {
            throw new Exception("The last name cannot be empty.");
        }
        else if (lastName.Length < 3 || lastName.Length > 100)
        {
            throw new Exception("last name must be between 3 and 100 characters long");
        }

        if (!string.IsNullOrWhiteSpace(phone) && phone.Length < 8)
        {
            throw new Exception("Phone number must be at least 8 characters long.");

        }


        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
        {
            throw new Exception("The email is not valid.");
        }
    }
}