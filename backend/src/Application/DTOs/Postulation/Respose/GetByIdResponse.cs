using Domain.Enums;

namespace Application.DTOs.Postulation.Response
{
    public class GetByIdResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
        public DateTime CreatedAt { get; set; }
        public EnumState State { get; set; }
        public string CvFilePath { get; set; }
        public string CvFileName { get; set; }

        public GetByIdResponse(Guid id, Guid userId, Guid jobOfferId, DateTime createdAt, EnumState state, string cvFilePath, string cvFileName)
        {
            Id = id;
            UserId = userId;
            JobOfferId = jobOfferId;
            CreatedAt = createdAt;
            State = state;
            CvFilePath = cvFilePath;
            CvFileName = cvFileName;
        }
    }

}