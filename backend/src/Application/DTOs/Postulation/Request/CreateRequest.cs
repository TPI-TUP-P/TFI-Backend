using Microsoft.AspNetCore.Http;

namespace Application.DTOs.Postulation.Request
{
    public class CreateRequest
    {
        public Guid JobOfferId { get; set; }
        public IFormFile? CV { get; set; }
        public bool UseSavedCv { get; set; }
    }
}

