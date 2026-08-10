
using Application.DTOs.Postulation.Request;
using Application.DTOs.Postulation.Response;
namespace Application.Interfaces
{
    public interface IPostulationService
    {
        Task<CreateResponse> Create(Guid idUser,CreateRequest request, CancellationToken cancellationToken);
        Task<GetByIdResponse> GetById(Guid id, Guid userId, CancellationToken cancellationToken);
        Task<List<GetAllResponse>> GetByUserId(Guid userId, Guid id, CancellationToken cancellationToken);
        Task<List<GetAllResponse>> GetByJobOfferId(Guid jobOfferId, Guid userId, CancellationToken cancellationToken);
        Task<UpdateResponse> UpdateState(Guid idUser, Guid id, UpdateRequest request, CancellationToken cancellationToken);
        Task Delete(Guid idUser, Guid id, CancellationToken cancellationToken);
    }
}