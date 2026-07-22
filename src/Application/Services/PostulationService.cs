using Application.DTOs.Postulation.Response;
using Domain.Entities;
using Domain.interfaces;
using Domain.Enums;
using Application.DTOs.Postulation.Request;
using Application.Interfaces;
using Domain.Interfaces;

namespace Application.Services
{
    public class PostulationService : IPostulationService
    {
        private readonly IPostulationRepository _postulationRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPublicationRepository _jobOfferRepository;
        


        public PostulationService(IPostulationRepository postulationRepository, IUserRepository userRepository, IPublicationRepository jobOfferRepository)
        {
            _postulationRepository = postulationRepository;
            _userRepository = userRepository;
            _jobOfferRepository = jobOfferRepository;

        }

        public async Task<CreateResponse> Create(Guid idUser, CreateRequest request, CancellationToken cancellationToken)
        {
            if (request.UserId == Guid.Empty)
            {
                throw new Exception("UserId is required");
            }
            if (request.JobOfferId == Guid.Empty)
            {
                throw new Exception("JobOfferId is required");
            }
            if (request.CV == null || request.CV.Length == 0)
            {
                throw new Exception("CV file is required");
            }
            var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var jobOffer = await _jobOfferRepository.GetByIdAsync(request.JobOfferId, cancellationToken);
            if (jobOffer == null)
            {
                throw new Exception("Job offer not found");
            }   
            
            if (idUser != request.UserId)
            {
                throw new Exception("UserId does not match the authenticated user's ID");
            }

            

            var postulation = new Postulation(request.UserId, request.JobOfferId, request.CV);
            await _postulationRepository.Create(postulation, cancellationToken);
            return new CreateResponse(
                postulation.Id,
                postulation.UserId,
                postulation.JobOfferId,
                postulation.CreatedAt,
                postulation.State,
                postulation.CV
            );
        }

        public async Task<GetByIdResponse> GetById(Guid id, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }
            return new GetByIdResponse(
                postulation.Id,
                postulation.UserId,
                postulation.JobOfferId,
                postulation.CreatedAt,
                postulation.State,
                postulation.CV
            );
        }

//que el usuario que quiera postularse sea el mismo que inicio sesion
// me genera un poco de dudas
        public async Task<UpdateResponse> Update(Guid idUser, Guid id, UpdateRequest request, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }
            if (idUser != postulation.UserId)
            {
                throw new Exception("UserId does not match the postulation's UserId");
            }

            postulation.UpdateState(request.State);
        

            await _postulationRepository.Update(postulation, cancellationToken);
            return new UpdateResponse(
                postulation.Id,
                postulation.UserId,
                postulation.JobOfferId,
                postulation.CreatedAt,
                postulation.State,
                postulation.CV
            );
        }

        public async Task<List<GetAllResponse>> GetAll(CancellationToken cancellationToken)
        {
            var postulations = await _postulationRepository.GetAll(cancellationToken);
            return postulations.Select(p => new GetAllResponse(
                p.Id,
                p.UserId,
                p.JobOfferId,
                p.CreatedAt,
                p.State,
                p.CV
            )).ToList();
        }

        

        public async Task Delete(Guid id, Guid idUser, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }
            if (idUser != postulation.UserId)
            {
                throw new Exception("UserId does not match the postulation's UserId");
            }
        

            await _postulationRepository.Delete(id, cancellationToken);
        }
    }
}