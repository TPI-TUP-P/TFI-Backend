namespace Application.Interfaces;

using Domain.Entities;
using Application.DTOs.Calification.Request;
using Application.DTOs.Calification.Response;

public interface ICalificationService
{
    Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken);

    Task<CreateResponse> AddAsync(Guid IdUser, CreateRequest publication, CancellationToken cancellationToken);

    Task<UpdateResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(Guid id, Guid idUser, CancellationToken cancellationToken);
}