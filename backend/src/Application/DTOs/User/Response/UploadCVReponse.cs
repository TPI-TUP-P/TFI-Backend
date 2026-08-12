namespace Application.DTOs.User.Response;
public class UpdloadCVResponse
{
    public required Guid IdUser { get; set; }
    public required string CvFileName { get; set; }
    public required string CvFilePath { get; set; }
}