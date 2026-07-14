using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

using Application.DTOs.Publication.Response;
using Application.DTOs.Publication.Request;
namespace Application.Services;

public class PublicationService : IPublicationService
{
    private readonly IPublicationRepository _Publication;

    public PublicationService(IPublicationRepository publication)
    {

        _Publication = publication;
    }

    public async Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken)
    {
        ValidateId(Id);
        var publication = await _Publication.GetByIdAsync(Id, cancellationToken) ?? throw new KeyNotFoundException("Publicantion No Found");
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
    public async Task<CreateResponse> AddAsync(CreateRequest publicationDto, CancellationToken cancellationToken)
    {

        var NewPublication = new Publication(
            publicationDto.Creator,
            publicationDto.Job_position!,
            publicationDto.Description!,
            publicationDto.Salary,
            publicationDto.Applicants
        );
        var publication = await _Publication.AddAsync(NewPublication, cancellationToken);

        return new CreateResponse(
            publication.Id,
            publication.Creator,
            publication.Job_position!,
            publication.Description!,
            publication.Salary,
            publication.Applicants,
            publication.Created_Date
        );
    }

    private void ValidateId(Guid Id)
    {
        if (Id == Guid.Empty)
        {
            throw new Exception("Id Empty");
        }
    }
}