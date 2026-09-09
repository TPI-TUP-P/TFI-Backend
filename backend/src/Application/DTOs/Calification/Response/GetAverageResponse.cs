namespace Application.DTOs.Calification.Response;

public class GetAverageResponse
{
    public Guid UserId { get; init; }
    public double Average { get; init; }
    public int Count { get; init; }

    public GetAverageResponse(Guid userId, double average, int count)
    {
        UserId = userId;
        Average = average;
        Count = count;
    }
}