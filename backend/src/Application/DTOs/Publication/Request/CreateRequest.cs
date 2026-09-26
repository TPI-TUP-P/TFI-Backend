namespace Application.DTOs.Publication.Request;

public class CreateRequest
{

    public required string Job_position { get; set; } = string.Empty;
    public required string Description { get; set; } = string.Empty;
    public required float Salary { get; set; }
    public required int Applicants { get; set; }


    public CreateRequest(string job_position, string description, float salary, int applicants)
    {
        Job_position = job_position;
        Description = description;
        Salary = salary;
        Applicants = applicants;
    }
}