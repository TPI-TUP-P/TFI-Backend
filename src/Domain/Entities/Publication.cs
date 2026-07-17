using System.Threading.Tasks.Dataflow;
namespace Domain.Entities;

public class Publication
{
    public Guid Id { get; init; }
    public Guid Creator { get; init; }
    public string? Job_position { get; set; } //null por ahora despues checkear
    public string? Description { get; set; }
    public float Salary { get; set; }
    public int Applicants { get; set; }
    public DateTime Created_Date { get; init; }
    public bool State { get; set; }

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
        State = true;
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

    public void Update(string job, string description, float salary)
    {
        if (salary < 0)
        {
            throw new Exception("salario mayor a 0");
        }
        if (string.IsNullOrEmpty(job))
        {
            throw new Exception("campo vacio.");
        }
        if (string.IsNullOrEmpty(description))
        {
            throw new Exception("campo vacio.");
        }
        Description = description;
        Job_position = job;
        Salary = salary;
    }
    public void AddApplicants()
    {
        if (!State)
        {
            throw new Exception("can't add apllicant cuz its is deleted");
        }
        Applicants++;
    }
    public void DeleteApplicants()
    {
        if (Applicants > 0)
        {
            Applicants--;
        }
    }
    public void Delete()
    {
        if (State is true)
        {

            var State = false;
        }

    }

}