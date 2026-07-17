namespace Application.DTOs.Publication.Request;

public class CreateRequest
{
    public Guid Creator { get; init; }
    public required string Job_position { get; set; } = string.Empty;
    public required string Description { get; set; } = string.Empty;
    public float Salary { get; set; }
    public int Applicants { get; set; }


    public CreateRequest(Guid creator, string job_position, string description, float salary, int applicants)
    {
        Creator = creator;
        Job_position = job_position;
        Description = description;
        Salary = salary;
        Applicants = applicants;
    }
}