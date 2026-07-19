namespace Application.DTOs.Postulation.Request
{
    public class CreateRequest
    {
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
    
        public CreateRequest( Guid userId, Guid jobOfferId)
        {
            UserId = userId;
            JobOfferId = jobOfferId;
        }
        
    }
}

