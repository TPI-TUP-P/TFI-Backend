using System.Security.Claims;
using Application.DTOs.User.Request;
using Application.DTOs.User.Response;
using Application.Interfaces.Services;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<GetByIdResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var user = await userService.GetByIdAsync(id, cancellationToken);
        return Ok(user);
    }


    [HttpPatch]
    [Authorize]
    public async Task<ActionResult<GetByIdResponse>> Update([FromBody] UpdateRequest updateRequest, CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim is null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var result = await userService.UpdateAsync(userId, updateRequest, cancellationToken);
        return Ok(result);
    }

    [HttpDelete("/me")]
    [Authorize]
    public async Task<ActionResult> Delete(CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

        if (userIdClaim is null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);
        var currentUserRole = Enum.Parse<UserRole>(roleClaim!);

        await userService.DeleteAsync(userId, userId, currentUserRole, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{idTarget}")]
    [Authorize(Roles = "Admin, SuperAdmin")]
    public async Task<ActionResult> Delete(Guid idTarget, CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

        if (userIdClaim is null || roleClaim is null)
        {
            return Unauthorized();
        }

        var currentUserId = Guid.Parse(userIdClaim);
        var currentUserRole = Enum.Parse<UserRole>(roleClaim);

        await userService.DeleteAsync(
            idTarget,
            currentUserId,
            currentUserRole,
            cancellationToken);

        return NoContent();
    }

}
