using System.Threading.Tasks.Dataflow;

class Publication
{
    public Guid Id { get; init; }
    public Guid Creator { get; init; }
    public string? Job_position { get; set; } //null por ahora despues checkear
    public string? Description { get; set; }
    public float Salary { get; set; }
    public int Applicants { get; set; }
    public DateTime Created_Date { get; init; }

    public Publication(Guid creator, string job_position, string description, float salary, int applicants)
    {
        ValidateProperties(job_position, description, salary, applicants);
        Id = Guid.NewGuid();
        Creator = creator;
        Job_position = job_position;
        Description = description;
        Salary = salary;
        Applicants = applicants;
        Created_Date = DateTime.UtcNow;
    }

    private void ValidateProperties(string job, string description, float salary, int applicants)
    {
        if (job is null)
        {
            throw new Exception("is null");
        }
        if (description is null)
        {
            throw new Exception("is null");
        }
        if (salary < 0)
        {
            throw new Exception("No se puede pagar menos de 0");
        }
        if (applicants < 0)
        {
            throw new Exception("No se puede tener menos de 0 aplicantes");
        }

    }

}