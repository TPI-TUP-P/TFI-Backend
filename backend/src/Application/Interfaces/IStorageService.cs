using Microsoft.AspNetCore.Http;


namespace Application.Interfaces;

public interface IStorageService
{
    Task<string> UploadAsync(IFormFile file);

    Task DeleteAsync(string filePath);
}