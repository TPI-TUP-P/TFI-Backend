namespace Application.Interfaces;

using Application.DTOs.Calification.Request;
using Application.DTOs.Calification.Response;

public interface ICalificationService
{
    Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken);
    Task<GetByIdResponse?> GetMyCalificationForUserAsync(Guid idQualifier, Guid idQualified, CancellationToken cancellationToken);

    Task<GetAverageResponse> GetAverageAsync(Guid idQualified, CancellationToken cancellationToken);

    Task<CreateResponse> AddAsync(Guid IdUser, CreateRequest publication, CancellationToken cancellationToken);

    Task<UpdateResponse> UpdateAsync(Guid id, UpdateRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(Guid id, Guid idUser, CancellationToken cancellationToken);
}
