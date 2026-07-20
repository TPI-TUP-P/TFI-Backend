using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;


using Application.DTOs.Publication.Response;
using Application.DTOs.Publication.Request;
using Application.Exceptions;
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

    public async Task<UpdateResponse> UpdateAsync(Guid IdUser, UpdateRequest publicationDto, CancellationToken cancellationToken)
    {

        ValidateId(publicationDto.Id);
        ValidateId(IdUser);

        var existingPublication = await GetByIdAsync(publicationDto.Id, cancellationToken);
        //why fay are scared of needles
        if (IdUser != existingPublication.Creator)
        {
            throw new UnauthorizedException();
        }
        if (!string.IsNullOrWhiteSpace(publicationDto.Job_position))
        {
            existingPublication.Job_position = publicationDto.Job_position;
        }
        if (!string.IsNullOrWhiteSpace(publicationDto.Description))
        {
            existingPublication.Description = publicationDto.Description;
        }
        if (publicationDto.Salary < 0)
        {
            existingPublication.Salary = publicationDto.Salary;
        }
        else
        {
            throw new Exception("agregar el error de numeros negativos");
        }
        return new UpdateResponse(
            existingPublication.Id,
            existingPublication.Creator,
            existingPublication.Job_position!,
            existingPublication.Description!,
            existingPublication.Salary,
            existingPublication.Applicants,
            existingPublication.Created_Date

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