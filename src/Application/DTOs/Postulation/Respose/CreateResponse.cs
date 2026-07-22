using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.DTOs.Postulation.Response
{
    public class CreateResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
        public DateTime CreatedAt { get; set; }
        public EnumState State { get; set; }
        public IFormFile CV { get; set; } 

        public CreateResponse(Guid id, Guid userId, Guid jobOfferId, DateTime createdAt, EnumState state, IFormFile cv)
        {
            Id = id;
            UserId = userId;
            JobOfferId = jobOfferId;
            CreatedAt = createdAt;
            State = state;
            CV = cv;
        }
    }
}