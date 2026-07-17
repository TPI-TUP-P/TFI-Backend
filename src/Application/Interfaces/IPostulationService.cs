using System;
using Application.DTOs.Postulation.Request;
using Application.DTOs.Postulation.Response;
namespace Application.Interfaces
{
    public interface IPostulationService
    {
        Task<CreateResponse> Create(Guid idUser,CreateRequest request, CancellationToken cancellationToken);
        Task<GetByIdResponse> GetById(Guid id, CancellationToken cancellationToken);
        Task<List<GetAllResponse>> GetAll(CancellationToken cancellationToken);
        Task<UpdateResponse> Update(Guid idUser, Guid id, UpdateRequest request, CancellationToken cancellationToken);
        Task Delete(Guid idUser, Guid id, CancellationToken cancellationToken);
    }
}