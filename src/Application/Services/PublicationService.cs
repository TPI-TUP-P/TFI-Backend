using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
//using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;
namespace Application.Services;

public class PublicationService : IPublicationService
{
    private readonly IPublicationRepository _Publication;

    public PublicationService(IPublicationRepository publication)
    {

        _Publication = publication;
    }

    public async Task<GetByIdResponse> GetById(Guid Id, CancellationToken cancellationToken)
    {
        var publication = await _Publication.GetById(Id, cancellationToken);
        // momentaño para que funcione
        return new GetByIdResponse(
            publication.Id,
            publication.Creator,
            publication.Job_position!,
            publication.Description!,
            publication.Salary,
            publication.Applicants,
            publication.Created_Date
            );

    }
}