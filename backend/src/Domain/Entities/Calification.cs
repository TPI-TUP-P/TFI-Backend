using Domain.Exceptions;
namespace Domain.Entities;

public class Calification
{
    public Guid Id { get; init; }

    public Guid IdQualifier { get; init; } //calificador

    public Guid IdQualified { get; init; } // calificado

    public DateTime CreateAt { get; init; }

    public int Score { get; set; }

    public bool State { get; set; }

    public Calification(Guid idQualifier, Guid idQualified, int score)
    {
        ValidateProperties(idQualifier, idQualified, score);
        Id = Guid.NewGuid();
        IdQualifier = idQualifier;
        IdQualified = idQualified;
        CreateAt = DateTime.UtcNow;
        Score = score;
        State = true;
    }

    private void ValidateProperties(Guid idQualifier, Guid idQualified, int score)
    {
        if (idQualifier == Guid.Empty)
        {
            throw new FieldEmptyException("idQualifier");
        }
        if (idQualified == Guid.Empty)
        {
            throw new FieldEmptyException("idQualified");
        }
        if (score < 0 || score > 5)
        {
            throw new NegativeNumbersException(); // momentaño
        }
    }
    public void Update(int score)
    {
        if (score < 0 || score > 5)
        {
            throw new NegativeNumbersException();
        }
        else
        {
            Score = score;
        }


    }
    public void Delete()
    {
        if (State is true)
        {

            State = false;
        }

    }
}