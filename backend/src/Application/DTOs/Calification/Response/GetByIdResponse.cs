namespace Application.DTOs.Calification.Response;

public class GetByIdResponse
{
    public Guid Id { get; init; }

    public Guid IdQualifier { get; init; } //calificador

    public Guid IdQualified { get; init; } // calificado

    public DateTime CreateAt { get; init; }

    public int Score { get; set; }

    public GetByIdResponse(Guid id, Guid idQualifier, Guid idQualified, DateTime createAt, int score)
    {
        Id = id;
        IdQualifier = idQualifier;
        IdQualified = idQualified;
        CreateAt = createAt;
        Score = score;
    }
}