using Microsoft.AspNetCore.Http;

namespace Application.DTOs.Postulation.Request
{
    public class CreateRequest
    {
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
        public IFormFile CV { get; set; } 
        public CreateRequest( Guid userId, Guid jobOfferId, IFormFile cv)
        {
            UserId = userId;
            JobOfferId = jobOfferId;
            CV = cv;
        }
        
    }
}

