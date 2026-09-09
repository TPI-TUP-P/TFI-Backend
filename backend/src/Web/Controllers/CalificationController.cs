namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Calification.Response;
using Application.DTOs.Calification.Request;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize] // cualquier usuario autenticado por default
public class CalificationController(ICalificationService _calification) : ControllerBase
{
   [HttpGet("{id:guid}")]
public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(
    Guid id,
    CancellationToken cancellationToken)
{
    var calification = await _calification.GetByIdAsync(id, cancellationToken);

    return Ok(calification);
}

    [HttpGet("average/{idQualified:guid}")]
    public async Task<ActionResult<GetAverageResponse>> GetAverageAsync(Guid idQualified, CancellationToken cancellationToken)
    {
        return Ok(await _calification.GetAverageAsync(idQualified, cancellationToken));
    }

    [Authorize(Roles = "Candidate,Admin,SuperAdmin")]
    [HttpGet("mine/{idQualified:guid}")]
    public async Task<ActionResult<GetByIdResponse?>> GetMineAsync(Guid idQualified, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var result = await _calification.GetMyCalificationForUserAsync(userId, idQualified, cancellationToken);
        return Ok(result); // null si no existe, el objeto si existe
    }

    [Authorize(Roles = "Candidate,Admin,SuperAdmin")]
    [HttpPost()]
    public async Task<ActionResult<CreateResponse>> AddAsync([FromBody] CreateRequest calificationDto, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var calification = await _calification.AddAsync(userId, calificationDto, cancellationToken);
        return Ok(calification);
    }

    [Authorize(Roles = "Candidate,Admin,SuperAdmin")]
    [HttpPatch()]
    public async Task<ActionResult<UpdateResponse>> UpdateAsync([FromBody] UpdateRequest calificationDto, CancellationToken cancellationToken)
    {
        var idUser = GetUserId();
        return Ok(await _calification.UpdateAsync(idUser, calificationDto, cancellationToken));
    }

    [Authorize(Roles = "Candidate,Admin,SuperAdmin")]
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