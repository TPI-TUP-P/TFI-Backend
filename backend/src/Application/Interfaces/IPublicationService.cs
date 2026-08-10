namespace Application.Interfaces;

using Domain.Entities;
using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;


public interface IPublicationService
{
    Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken);

    Task<CreateResponse> AddAsync(Guid IdUser, CreateRequest publication, CancellationToken cancellationToken);

    Task<List<GetByIdResponse>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken);

    Task<UpdateResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(Guid id, Guid idUser, CancellationToken cancellationToken);

    Task<bool> PublicationExistsAsync(Guid idPublication, CancellationToken cancellationToken);

    Task<List<GetByIdResponse>> GetAllByCreatorAsync(Guid creatorId, int page, int pageSize, CancellationToken cancellationToken);

    Task<int> CountMyPublicationsAsync(Guid creatorId, CancellationToken cancellationToken);
}