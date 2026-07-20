namespace Application.DTOs.Calification.Request;

public class CreateRequest
{

    public Guid IdQualifier { get; init; } //calificador

    public Guid IdQualified { get; init; } // calificado

    public int Score { get; set; }

    public CreateRequest(Guid idQualifier, Guid idQualified, int score)
    {
        IdQualifier = idQualifier;
        IdQualified = idQualified;
        Score = score;
    }
}