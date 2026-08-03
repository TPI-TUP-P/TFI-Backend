using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Calification.Response;
using Application.DTOs.Calification.Request;
using Domain.Interfaces;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace Web.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Candidate,Admin,SuperAdmin")]

public class CalificationController(ICalificationService _calification) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _calification.GetByIdAsync(id, cancellationToken));
    }

    [HttpPost()]

    public async Task<ActionResult<CreateResponse>> AddAsync([FromBody] CreateRequest calificationDto, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var calification = await _calification.AddAsync(userId, calificationDto, cancellationToken);

        return CreatedAtAction(nameof(GetByIdAsync), new { id = calification.Id }, calification);
    }
    [HttpPatch()]
    public async Task<ActionResult<UpdateResponse>> UpdateAsync([FromBody] UpdateRequest calificationDto, CancellationToken cancellationToken)
    {

        var idUser = GetUserId();
        return Ok(await _calification.UpdateAsync(idUser, calificationDto, cancellationToken));
    }

    [HttpDelete("{id:guid}")]
    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var idUser = GetUserId();
        await _calification.DeleteAsync(id, idUser, cancellationToken);

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