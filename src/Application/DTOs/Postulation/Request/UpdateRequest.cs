using Microsoft.AspNetCore.Http;
using Domain.Enums;

namespace Application.DTOs.Postulation.Request
{
    public class UpdateRequest
    {

        public EnumState State { get; set; }
        public IFormFile CV { get; set; } 
    
        public UpdateRequest(EnumState state, IFormFile cv)
        {
            State = state;
            CV = cv;
        }
        
    }
}

