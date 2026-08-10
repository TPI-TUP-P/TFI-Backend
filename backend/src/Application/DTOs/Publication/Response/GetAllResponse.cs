namespace Application.DTOs.Publication.Response;

public class GetAllResponse
{
    public Guid Id { get; init; }
    public Guid Creator { get; init; }
    public string? Job_position { get; set; }
    public string? Description { get; set; }
    public float Salary { get; set; }
    public int Applicants { get; set; }
    public DateTime Created_Date { get; init; }

    public GetAllResponse(
        Guid id,
        Guid creator,
        string? job_position,
        string? description,
        float salary,
        int applicants,
        DateTime created_Date)
    {
        Id = id;
        Creator = creator;
        Job_position = job_position;
        Description = description;
        Salary = salary;
        Applicants = applicants;
        Created_Date = created_Date;
    }
}