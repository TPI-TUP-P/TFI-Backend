namespace Application.DTOs.Calification.Request;

public class CreateRequest
{

    //public Guid IdQualifier { get; init; } //calificador, i dont need that.

    public Guid IdQualified { get; init; } // calificado

    public int Score { get; set; }

    public CreateRequest(Guid idQualified, int score)
    {
        IdQualified = idQualified;
        Score = score;
    }
}