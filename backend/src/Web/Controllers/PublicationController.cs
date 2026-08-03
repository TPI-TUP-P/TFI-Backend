using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;
using Domain.Interfaces;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace Web.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class PublicationController(IPublicationService _publication) : ControllerBase
{
    // im testing the new method to do inject dependecy
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _publication.GetByIdAsync(id, cancellationToken));
    }

     

    [HttpPost()]

    public async Task<ActionResult<CreateResponse>> AddAsync([FromBody] CreateRequest publicationDto, CancellationToken cancellationToken)
    {
        var publication = await _publication.AddAsync(publicationDto, cancellationToken);

        // return CreatedAtAction(nameof(GetByIdAsync), new { id = publication.Id }, publication);
        return Ok();
    }

    [HttpPatch()]
    public async Task<ActionResult<UpdateResponse>> UpdateAsync([FromBody] UpdateRequest publicationDto, CancellationToken cancellationToken)
    {

        var idUser = GetUserId();
        return Ok(await _publication.UpdateAsync(idUser, publicationDto, cancellationToken));
    }
    [HttpDelete("{id:guid}")]
    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var idUser = GetUserId();
        await _publication.DeleteAsync(id, idUser, cancellationToken);

    }
    private Guid GetUserId()
    {
        var idUserToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                        ?? User.FindFirst("id")?.Value
                        ?? User.FindFirst("sub")?.Value;
        if (idUserToken is null)
        {
            throw new Exception("Id From token");
        }
        if (!Guid.TryParse(idUserToken, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid user identifier.");
        }

        return userId;


    }
}