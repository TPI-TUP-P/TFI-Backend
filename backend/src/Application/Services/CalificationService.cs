using Domain.Entities;
using Domain.Interfaces;
using Application.Exceptions;
namespace Application.Services;

using Application.DTOs.Calification.Response;
using Application.DTOs.Calification.Request;
using Application.Interfaces;

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

        var qualified = await _User.ExistsUserId(calificationDto.IdQualified, cancellationToken);
        if (qualified is false)
        {
            throw new NotFoundException("User");
        }

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

        var existingCalification = await _Calification.GetByIdAsync(calificationDto.Id, cancellationToken);
        if (calificationDto.Score > 0 && calificationDto.Score < 6)
        {
            existingCalification!.Score = calificationDto.Score;
        }
        else
        {
            throw new NegativeNumberException("Salary");
        }

        var newCalification = new UpdateResponse(
            existingCalification.Id,
            existingCalification.IdQualifier,
            existingCalification.IdQualified,
            existingCalification.CreateAt,
            existingCalification.Score
        );

        await _Calification.UpdateAsync(existingCalification, cancellationToken);
        return newCalification;
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