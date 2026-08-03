namespace Application.DTOs.Publication.Request;

public class UpdateRequest
{
    public Guid Id { get; init; }
    public required string Job_position { get; set; } = string.Empty;
    public required string Description { get; set; } = string.Empty;
    public float Salary { get; set; }



    public UpdateRequest(Guid id, string job_position, string description, float salary, int applicants)
    {
        Id = id;
        Job_position = job_position;
        Description = description;
        Salary = salary;
    }
}