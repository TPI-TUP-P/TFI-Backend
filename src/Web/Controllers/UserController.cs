using Application.DTOs.User.Response;
using Application.Interfaces.Services;
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

 
}
