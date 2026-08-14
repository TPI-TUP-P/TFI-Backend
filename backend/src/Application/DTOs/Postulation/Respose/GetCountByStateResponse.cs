namespace Application.DTOs.Postulation.Response;

public class GetCountByStateResponse
{
    public int Pending { get; set; }
    public int Accepted { get; set; }
    public int Rejected { get; set; }
}