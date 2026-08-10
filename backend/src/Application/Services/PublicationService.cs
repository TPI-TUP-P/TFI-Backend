using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;


using Application.DTOs.Publication.Response;
using Application.DTOs.Publication.Request;
using Application.Exceptions;
using System.ComponentModel;
namespace Application.Services;

public class PublicationService(IPublicationRepository _Publication) : IPublicationService
{
    public async Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken)
    {
        ValidateId(Id);
        var publication = await _Publication.GetByIdAsync(Id, cancellationToken) ?? throw new NotFoundException("Publicantion");
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
    public async Task<List<GetByIdResponse>> GetAllByCreatorAsync(Guid creatorId, int page, int pageSize, CancellationToken cancellationToken)
    {
        if (creatorId == Guid.Empty)
            throw new ArgumentException("CreatorId is invalid.");

        if (page < 1)
            throw new ArgumentException("Page must be greater than 0.");

        if (pageSize < 1)
            throw new ArgumentException("PageSize must be greater than 0.");

        if (pageSize > 25)
            pageSize = 25;

        var publications = await _Publication.GetAllByCreatorAsync(creatorId, page, pageSize, cancellationToken);

        return publications.Select(p => new GetByIdResponse(
            p.Id,
            p.Creator,
            p.Job_position!,
            p.Description!,
            p.Salary,
            p.Applicants,
            p.Created_Date
        )).ToList();
    }
    public async Task<CreateResponse> AddAsync(Guid IdUser, CreateRequest publicationDto, CancellationToken cancellationToken)
    {
        ValidateId(IdUser);
        if (publicationDto is null)
        {
            throw new NotFoundException("publication dto");
        }
        CheckField(publicationDto.Job_position, "Job_position");
        CheckField(publicationDto.Description, "Description");


        var NewPublication = new Publication(
            IdUser,
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

        var existingPublication = await _Publication.GetByIdAsync(publicationDto.Id, cancellationToken);
        //why fay are scared of needles
        if (IdUser != existingPublication!.Creator)
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
        if (publicationDto.Salary > 0)
        {
            existingPublication.Salary = publicationDto.Salary;
        }
        else
        {
            throw new NegativeNumberException("Salary");
        }
        await _Publication.UpdateAsync(existingPublication, cancellationToken);
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

    public async Task<int> CountMyPublicationsAsync(Guid creatorId, CancellationToken cancellationToken)
    {
        if (creatorId == Guid.Empty)
            throw new ArgumentException("CreatorId is invalid.");

        return await _Publication.CountByCreatorAsync(
            creatorId,
            cancellationToken);
    }

    public async Task DeleteAsync(Guid id, Guid idUser, CancellationToken cancellationToken)
    {
        ValidateId(id);
        ValidateId(idUser);

        var publication = await _Publication.GetByIdAsync(id, cancellationToken) ?? throw new NotFoundException("Publication");
        if (publication.Creator != idUser)
        {
            throw new UnauthorizedAccessException();
        }
        await _Publication.DeleteAsync(publication, cancellationToken);
    }

    public async Task<bool> PublicationExistsAsync(Guid idPublication, CancellationToken cancellationToken)
    {
        return await _Publication.ExistsAsync(idPublication, cancellationToken);
    }

    public async Task<List<GetByIdResponse>> GetAllAsync(
            int page,
            int pageSize,
            CancellationToken cancellationToken)
    {
        if (page < 1)
            throw new ArgumentException("Page must be greater than 0.");

        if (pageSize < 1)
            throw new ArgumentException("PageSize must be greater than 0.");

        if (pageSize > 25)
            pageSize = 25;

        var publications = await _Publication.GetAllAsync(page, pageSize, cancellationToken);

        return publications.Select(p => new GetByIdResponse(
            p.Id,
            p.Creator,
            p.Job_position!,
            p.Description!,
            p.Salary,
            p.Applicants,
            p.Created_Date
        )).ToList();
    }

    public async Task<List<GetByIdResponse>> SearchByNameAsync(string name, int page, int pageSize, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Search name cannot be empty.");

        if (page < 1)
            throw new ArgumentException("Page must be greater than 0.");

        if (pageSize < 1)
            throw new ArgumentException("PageSize must be greater than 0.");

        if (pageSize > 25)
            pageSize = 25;

        var publications = await _Publication.SearchByNameAsync(
            name.Trim(),
            page,
            pageSize,
            cancellationToken);

        return publications.Select(p => new GetByIdResponse(
            p.Id,
            p.Creator,
            p.Job_position!,
            p.Description!,
            p.Salary,
            p.Applicants,
            p.Created_Date
        )).ToList();
    }

    private void ValidateId(Guid Id)
    {
        if (Id == Guid.Empty)
        {
            throw new NotFoundException("Id");
        }
    }

    private void CheckField(string field, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(field))
        {
            throw new NotFoundException(fieldName);
        }
    }


}