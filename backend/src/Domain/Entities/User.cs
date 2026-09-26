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
    [Required]
    public UserRole Role { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? CVFileName { get; set; }
    public string? CVFilePath { get; set; }
    
    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpires { get; set; }

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


    public void UpdateCv(string cvFileName, string cvFilePath)
    {
        CVFileName = cvFileName;
        CVFilePath = cvFilePath;
    }
    public void Delete()
    {
        IsActive = false;
    }

    public void Active()
    {
        IsActive =true;
    }
    
    public void GeneratePasswordResetToken()
    {
        ResetToken = Convert.ToHexString(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
        ResetTokenExpires = DateTime.UtcNow.AddHours(24);
    }
    
    public bool ValidateResetToken(string token)
    {
        return ResetToken == token && ResetTokenExpires.HasValue && ResetTokenExpires.Value > DateTime.UtcNow;
    }
    
    public void UpdatePassword(string newPasswordHash)
    {
        Password = newPasswordHash;
        ResetToken = null;
        ResetTokenExpires = null;
    }

    public User() { }

    private static void ValidateProperties(
     string name,
     string lastName,
     string phone,
     string email,
     string password)
    {
        ValidateName(name);
        ValidateLastName(lastName);
        ValidatePhone(phone);
        ValidateEmail(email);
        ValidatePassword(password);
    }

    public void Update(
        string? name,
        string? lastName,
        string? phone)
    {
        if (name is not null)
        {
            ValidateName(name);
            Name = name;
        }

        if (lastName is not null)
        {
            ValidateLastName(lastName);
            LastName = lastName;
        }

        if (phone is not null)
        {
            ValidatePhone(phone);
            Phone = phone;
        }
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new FieldEmptyException(nameof(name));

        if (name.Length < 3 || name.Length > 100)
            throw new InvalidLengthException(3, 100, name);

        if (!Regex.IsMatch(name, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            throw new InvalidFormatException(name);
    }

    private static void ValidateLastName(string lastName)
    {
        if (string.IsNullOrWhiteSpace(lastName))
            throw new FieldEmptyException(nameof(lastName));

        if (lastName.Length < 3 || lastName.Length > 100)
            throw new InvalidLengthException(3, 100, lastName);

        if (!Regex.IsMatch(lastName, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            throw new InvalidFormatException(lastName);
    }

    private static void ValidatePhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
            throw new FieldEmptyException(nameof(phone));

        if (!Regex.IsMatch(phone, @"^\+?[0-9]{8,15}$"))
            throw new InvalidFormatException(phone);
    }
    private static void ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new FieldEmptyException(nameof(email));

        if (!Regex.IsMatch(
            email,
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        {
            throw new InvalidFormatException(email);
        }
    }

    private static void ValidatePassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new FieldEmptyException(nameof(password));

        if (password.Length < 8 || password.Length > 100)
            throw new InvalidLengthException(8, 100, password);

        // Ejemplo de regla de dominio:
        if (!Regex.IsMatch(password, @"[A-Z]") ||
            !Regex.IsMatch(password, @"[a-z]") ||
            !Regex.IsMatch(password, @"[0-9]"))
        {
            throw new InvalidFormatException(password);
        }
    }

}