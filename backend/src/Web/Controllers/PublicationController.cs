using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize()]
public class PublicationController(IPublicationService _publication) : ControllerBase
{
    // im testing the new method to do inject dependecy
    [HttpGet("{id:guid}", Name = "GetPublicationById")]
    public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _publication.GetByIdAsync(id, cancellationToken));
    }


    [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
    [HttpPost()]
    public async Task<ActionResult<CreateResponse>> AddAsync([FromBody] CreateRequest publicationDto, CancellationToken cancellationToken)
    {
        var UserId = GetUserId();
        var publication = await _publication.AddAsync(UserId, publicationDto, cancellationToken);
        if (publication.Id == Guid.Empty)
        {
            throw new Exception("Publication.Id is empty");
        }

        return CreatedAtRoute(
        "GetPublicationById",
        new { id = publication.Id },
        publication);
    }
    [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
    [HttpPatch()]
    public async Task<ActionResult<UpdateResponse>> UpdateAsync([FromBody] UpdateRequest publicationDto, CancellationToken cancellationToken)
    {

        var idUser = GetUserId();
        return Ok(await _publication.UpdateAsync(idUser, publicationDto, cancellationToken));
    }
    [Authorize(Roles = "Recruiter,Admin, SuperAdmin")]
    [HttpDelete("{id:guid}")]
    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var idUser = GetUserId();
        await _publication.DeleteAsync(id, idUser, cancellationToken);

    }
    [HttpGet] // GET /api/Publication?page=2
    public async Task<ActionResult<GetAllPublicationsResponse>> GetAllAsync(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 25,
    CancellationToken cancellationToken = default)
    {
        var publications = await _publication.GetAllAsync(
            page,
            pageSize,
            cancellationToken);

        return Ok(publications);
    }

    [HttpGet("my")]
    [Authorize(Roles = "Recruiter,Admin,SuperAdmin")] //GET /api/Publication/my
    public async Task<ActionResult<List<GetByIdResponse>>> GetMyPublicationsAsync([FromQuery] int page = 1, [FromQuery] int pageSize = 25, CancellationToken cancellationToken = default)
    {
        var userId = GetUserId();

        var publications = await _publication.GetAllByCreatorAsync(
            userId,
            page,
            pageSize,
            cancellationToken);

        return Ok(publications);
    }
    [HttpGet("my/count")]
    [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
    public async Task<ActionResult<int>> CountMyPublicationsAsync(CancellationToken cancellationToken)
    {
        var userId = GetUserId();

        var count = await _publication.CountMyPublicationsAsync(
            userId,
            cancellationToken);

        return Ok(count);
    }

    [HttpGet("search")] // GET /api/Publication/search?name=backend
    public async Task<ActionResult<List<GetByIdResponse>>> SearchByNameAsync([FromQuery] string name, [FromQuery] int page = 1, [FromQuery] int pageSize = 25, CancellationToken cancellationToken = default)
    {
        var publications = await _publication.SearchByNameAsync(
            name,
            page,
            pageSize,
            cancellationToken);

        return Ok(publications);
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