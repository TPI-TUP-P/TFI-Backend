namespace Application.DTOs.Publication.Request;

public class CreateRequest
{
    public Guid Creator { get; init; }
    public string? Job_position { get; set; }
    public string? Description { get; set; }
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