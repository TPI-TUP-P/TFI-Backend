namespace Application.DTOs.Calification.Request;

public class UpdateRequest
{
    public Guid Id { get; init; }
    public Guid IdQualifier { get; init; } //calificador

    public Guid IdQualified { get; init; } // calificado

    public int Score { get; set; }

    public UpdateRequest(Guid id, Guid idQualifier, Guid idQualified, int score)
    {
        Id = id;
        IdQualifier = idQualifier;
        IdQualified = idQualified;
        Score = score;
    }
}