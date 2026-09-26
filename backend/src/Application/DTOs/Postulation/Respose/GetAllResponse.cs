using Domain.Enums;
namespace Application.DTOs.Postulation.Response
{
    public class GetAllResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
        public DateTime CreatedAt { get; set; }
        public EnumState State { get; set; }
        public string CvFileName { get; set; }

        public GetAllResponse(Guid id, Guid userId, Guid jobOfferId, DateTime createdAt, EnumState state, string cvFileName)
        {
            Id = id;
            UserId = userId;
            JobOfferId = jobOfferId;
            CreatedAt = createdAt;
            State = state;
            CvFileName = cvFileName;
        }
    }
}