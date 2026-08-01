using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Application.Exceptions;
namespace Application.Services;

using Application.DTOs.Calification.Response;
using Application.DTOs.Calification.Request;
using Application.Interfaces.Services;

public class CalificationService(ICalificationRepository _Calification, IUserService _User) : ICalificationService
{
    public async Task<GetByIdResponse> GetByIdAsync(Guid Id, CancellationToken cancellationToken)
    {
        ValidateId(Id);
        var calification = await _Calification.GetByIdAsync(Id, cancellationToken) ?? throw new NotFoundException("Calification");

        return new GetByIdResponse(
            calification!.Id,
            calification.IdQualifier,
            calification.IdQualified,
            calification.CreateAt,
            calification.Score
        );
    }

    public async Task<CreateResponse> AddAsync(Guid IdUser, CreateRequest calificationDto, CancellationToken cancellationToken)
    {
        if (calificationDto is null)
        {
            throw new NotFoundException("CalificationDto");
        }
        // no make sense get all data if i dont use that, so we can create a method for get if user exist without get all data, need ask to agus
        var qualified = await _User.GetByIdAsync(calificationDto.IdQualified, cancellationToken) ?? throw new NotFoundException("User");

        if (calificationDto.Score < 0 || calificationDto.Score > 5)
        {
            throw new OutRangeException("Score");
        }

        var NewCalification = new Calification(
            IdUser,
            calificationDto.IdQualified,
            calificationDto.Score
        );
        var calification = await _Calification.AddAsync(NewCalification, cancellationToken);
        return new CreateResponse(
            calification.Id,
            calification.IdQualifier,
            calification.IdQualified,
            calification.CreateAt,
            calification.Score
        );
    }
    public async Task<UpdateResponse> UpdateAsync(Guid IdUser, UpdateRequest calificationDto, CancellationToken cancellationToken)
    {

        ValidateId(calificationDto.IdQualifier);
        ValidateId(calificationDto.IdQualified);
        ValidateId(calificationDto.Id);
        ValidateId(IdUser);

        var existingCalification = await GetByIdAsync(calificationDto.Id, cancellationToken);
        if (calificationDto.Score > 0 && calificationDto.Score < 6)
        {
            existingCalification.Score = calificationDto.Score;
        }
        else
        {
            throw new NegativeNumberException("Salary");
        }
        return new UpdateResponse(
            existingCalification.Id,
            existingCalification.IdQualifier,
            existingCalification.IdQualified,
            existingCalification.CreateAt,
            existingCalification.Score
        );
    }

    public async Task DeleteAsync(Guid id, Guid idUser, CancellationToken cancellationToken)
    {
        ValidateId(id);
        ValidateId(idUser);

        var calification = await _Calification.GetByIdAsync(id, cancellationToken) ?? throw new NotFoundException("Calification");
        if (calification.IdQualifier != idUser)
        {
            throw new UnauthorizedAccessException();
        }
        await _Calification.DeleteAsync(calification, cancellationToken);
    }


    private void ValidateId(Guid Id)
    {
        if (Id == Guid.Empty)
        {
            throw new NotFoundException("Id");
        }
    }

}