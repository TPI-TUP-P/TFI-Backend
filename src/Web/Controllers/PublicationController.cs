using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;
using Domain.Interfaces;
using Application.Interfaces;

namespace Web.Controllers;

[ApiController]
[Route("[controller]")]

public class PublicationController : ControllerBase
{
    private readonly IPublicationService _publication;
    public PublicationController(IPublicationService publication)
    {
        _publication = publication;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _publication.GetByIdAsync(id, cancellationToken));
    }

    [HttpPost("")]

    public async Task<ActionResult<CreateResponse>> AddAsync([FromBody] CreateRequest publicationDto, CancellationToken cancellationToken)
    {
        var publication = await _publication.AddAsync(publicationDto, cancellationToken);

        return CreatedAtAction(nameof(GetByIdAsync), new { id = publication.Id }, publication);
    }
}