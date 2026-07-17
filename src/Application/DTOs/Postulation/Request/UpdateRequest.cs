using Domain.Enums;

namespace Application.DTOs.Postulation.Request
{
    public class UpdateRequest
    {

        public EnumState State { get; set; }
    
        public UpdateRequest(EnumState state)
        {
            State = state;
        }
    }
}

