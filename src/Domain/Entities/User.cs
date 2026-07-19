using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Domain.Enums;
using Domain.Exceptions;

namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    public bool IsActive { get; private set; } = true;
    public UserRole Role { get; set; }
    public DateTime CreatedDate { get; set; }



    public User(string name, string lastName, string phone, string email, string password, UserRole role)
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
            throw new FieldEmptyException("Name");
        }
        else if (name.Length < 3 || name.Length > 100)
        {
            throw new InvalidLegthException(3, 100, name);
        }
        else if (!Regex.IsMatch(name, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
        {
            throw new InvalidFormatException(name);
        }



        if (string.IsNullOrWhiteSpace(lastName))
        {
            throw new FieldEmptyException("Last name");
        }
        else if (lastName.Length < 3 || lastName.Length > 100)
        {
            throw new InvalidLegthException(3, 100, lastName);
        }
        else if (!Regex.IsMatch(lastName, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
        {
            throw new InvalidFormatException(lastName);

        }


        if (!string.IsNullOrWhiteSpace(phone) && phone.Length < 8)
        {
            throw new InvalidLegthException(phone, 8);

        }
        else if (!Regex.IsMatch(phone, @"^\+?[0-9]{8,15}$"))
        {

            throw new InvalidFormatException(nameof(phone));
        }


        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
        {
            throw new FieldEmptyException(email);
        }
    }
}