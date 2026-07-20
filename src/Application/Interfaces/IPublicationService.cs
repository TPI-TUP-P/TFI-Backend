namespace Application.Interfaces;

using Domain.Entities;
using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;


public interface IPublicationService
{
    Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken);

    Task<CreateResponse> AddAsync(CreateRequest publication, CancellationToken cancellationToken);

    Task<UpdateResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);
}