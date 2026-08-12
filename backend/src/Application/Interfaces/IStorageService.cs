using Microsoft.AspNetCore.Http;


namespace Application.Interfaces;

public interface IStorageService
{
    Task<string> UploadAsync(IFormFile file, Guid userId, Guid jobOfferId);
    Task<string> UploadProfileCvAsync(IFormFile file, Guid idUser);
    Task DeleteAsync(string filePath);
}