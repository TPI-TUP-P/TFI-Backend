namespace Web.Controllers
{
    using System.Security.Claims;
    using Application.DTOs.Postulation.Request;
    using Application.DTOs.Postulation.Response;
    using Application.Services;
    using Domain.Entities;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class PostulationController : ControllerBase
    {
        private readonly PostulationService _postulationService;

        public PostulationController(PostulationService postulationService)
        {
            _postulationService = postulationService;
        }

        [HttpPost]
        public async Task<ActionResult<CreateResponse>> Create([FromBody] CreateRequest request, CancellationToken cancellationToken)
        {
            var idUserToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("id")?.Value
            ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(idUserToken))
                return Unauthorized("user id not found in token");

            var userId = Guid.Parse(idUserToken);
        
            await _postulationService.Create(userId, request, cancellationToken);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetByIdResponse>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var postulation = await _postulationService.GetById(id, cancellationToken);
            if (postulation == null)
            {
                return NotFound();
            }
            return Ok(postulation);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAllResponse>>> GetAll(CancellationToken cancellationToken)
        {
            var postulations = await _postulationService.GetAll(cancellationToken);
            return Ok(postulations);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<UpdateResponse>> Update(Guid id, [FromBody] UpdateRequest request, CancellationToken cancellationToken)
        {
            var idUserToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("id")?.Value
            ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(idUserToken))
            return Unauthorized("user id not found in token");

        var idUser = Guid.Parse(idUserToken);

            await _postulationService.Update(idUser, id, request, cancellationToken);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var idUserToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("id")?.Value
            ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(idUserToken))
                return Unauthorized("user id not found in token");

            var idUser = Guid.Parse(idUserToken);
            await _postulationService.Delete(id, idUser, cancellationToken);
            return NoContent();
        }
    }
}
