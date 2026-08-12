using Microsoft.AspNetCore.Http;

namespace Application.DTOs.User.Request;

public class UploadCVRequest
{
    public required IFormFile CV { get; set; }
}