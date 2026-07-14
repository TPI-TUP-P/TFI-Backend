namespace Application.Interfaces;

using Domain.Entities;
//using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;


public interface IPublicationService
{
    Task<GetByIdResponse> GetById(Guid Id, CancellationToken cancellationToken);

    //faltan mas
}