using Microsoft.AspNetCore.Mvc;
//using Application.DTOs.Publication.Request;
using Application.DTOs.Publication.Response;
namespace Web.Controllers;

[ApiController]
[Route("[controller]")]

public class PublicationController : ControllerBase
{


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        return Ok();
    }
}