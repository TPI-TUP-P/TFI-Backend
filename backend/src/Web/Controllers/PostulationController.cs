namespace Web.Controllers
{
    using System.Security.Claims;
    using Application.DTOs.Postulation.Request;
    using Application.DTOs.Postulation.Response;
    using Application.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostulationController : ControllerBase
    {
        private readonly IPostulationService _postulationService;

        public PostulationController(IPostulationService postulationService)
        {
            _postulationService = postulationService;
        }

        [Authorize(Roles = "Candidate,Admin,SuperAdmin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<CreateResponse>> Create([FromForm] CreateRequest request, CancellationToken cancellationToken)
        {
            var userId = GetUserId();

            await _postulationService.Create(userId, request, cancellationToken);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetByIdResponse>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var userId = GetUserId();

            var postulation = await _postulationService.GetById(id, userId, cancellationToken);
            if (postulation == null)
            {
                return NotFound();
            }
            return Ok(postulation);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCountByUserId(CancellationToken cancellationToken)
        {
            var userId = GetUserId();

            var count = await _postulationService.GetCountByUserId(userId, cancellationToken);
            return Ok(count);
        }


        [HttpGet("{id}/cv")]
        public async Task<ActionResult<string>> GetCvUrl(Guid id, CancellationToken cancellationToken)
        {
            var idUser = GetUserId();
            var url = await _postulationService.GetCvDownloadUrl(id, idUser, cancellationToken);
            return Ok(new { url });
        }




        [HttpGet("user/{Id}")]
        public async Task<ActionResult<List<GetAllResponse>>> GetByUserId(Guid Id, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var postulations = await _postulationService.GetByUserId(userId, Id, cancellationToken);
            return Ok(postulations);
        }


        [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
        [HttpGet("{jobOfferId}/postulations")]
        public async Task<ActionResult<GetByJobOfferIdPagedResponse>> GetByJobOfferId(
    Guid jobOfferId,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20,
    CancellationToken cancellationToken = default)
        {
            var userId = GetUserId();

            var postulations =
                await _postulationService.GetByJobOfferId(
                    jobOfferId,
                    page,
                    pageSize,
                    userId,
                    cancellationToken);

            return Ok(postulations);
        }


        [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
        [HttpPatch("{id}")]
        public async Task<ActionResult<UpdateResponse>> UpdateState(Guid id, [FromBody] UpdateRequest request, CancellationToken cancellationToken)
        {
            var idUser = GetUserId();

            await _postulationService.UpdateState(idUser, id, request, cancellationToken);
            return Ok();
        }

        [Authorize(Roles = "Recruiter,Admin,SuperAdmin")]
        [HttpGet("interviewer/count-by-state")] ///api/Postulation/interviewer/count-by-state
        public async Task<ActionResult<GetCountByStateResponse>> GetCountByInterviewer(CancellationToken cancellationToken)
        {
            // It obtains the total number of applications grouped by state for all posts created by the authenticated interviewer.
            var userId = GetUserId();

            var result = await _postulationService.GetCountByInterviewerId(userId, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var idUser = GetUserId();
            await _postulationService.Delete(id, idUser, cancellationToken);
            return NoContent();
        }
        private Guid GetUserId() //obtain the id through the token
        {
            var idUserToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                            ?? User.FindFirst("id")?.Value
                            ?? User.FindFirst("sub")?.Value;
            if (idUserToken is null)
            {
                throw new UnauthorizedAccessException("User identifier not found in token.");
            }
            if (!Guid.TryParse(idUserToken, out var userId))
            {
                throw new UnauthorizedAccessException("Invalid user identifier.");
            }

            return userId;

        }
    }
}
