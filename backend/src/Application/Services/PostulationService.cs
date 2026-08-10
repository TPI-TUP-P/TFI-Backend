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
        private readonly IUserService _userService;
        private readonly IPublicationService _PublicationService;
        private readonly IStorageService _storageService;



        public PostulationService(IPostulationRepository postulationRepository, IUserService userService, IPublicationService publicationService, IStorageService storageService)
        {
            _postulationRepository = postulationRepository;
            _userService = userService;
            _PublicationService = publicationService;
            _storageService = storageService;
        }

        public async Task<CreateResponse> Create(Guid idUser, CreateRequest request, CancellationToken cancellationToken)
        {
            if (idUser == Guid.Empty)
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
            var user = await _userService.GetByIdAsync(idUser, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            if (user.Role != UserRole.Candidate)
            {
                throw new Exception("User is not a candidate");
            }
            var jobOfferExist = await _PublicationService.PublicationExistsAsync(request.JobOfferId,  cancellationToken);
            if (!jobOfferExist)
            {
                throw new Exception("Job offer not found");
            }

            //if (idUser != request.UserId)
            //{
            //throw new Exception("UserId does not match the authenticated user's ID");
            //}

            var exists = await _postulationRepository.ExistsAsync(idUser, request.JobOfferId, cancellationToken);
            if (exists)
            {
                throw new Exception("User has already applied to this job offer");
            }
            
                var cvPath = await _storageService.UploadAsync(request.CV, idUser, request.JobOfferId);
                var postulation = new Postulation(idUser, request.JobOfferId, request.CV.FileName, cvPath);
                await _postulationRepository.Create(postulation, cancellationToken);
                return new CreateResponse(
                    postulation.Id,
                    postulation.UserId,
                    postulation.JobOfferId,
                    postulation.CreatedAt,
                    postulation.State,
                    postulation.CvFileName
                );
            
        }

        public async Task<GetByIdResponse> GetById(Guid id, Guid userId, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }

            var user = await _userService.GetByIdAsync(userId, cancellationToken);

                if (user == null)
                {
                    throw new Exception("User not found");
                }

            var jobOfferExist = await _PublicationService.PublicationExistsAsync(postulation.JobOfferId, cancellationToken);

                if (!jobOfferExist)
                {
                    throw new Exception("Job offer not found");
                }

            var jobOffer = await _PublicationService.GetByIdAsync(postulation.JobOfferId, cancellationToken);

            if (user.Role != UserRole.Admin)
            {
                if (userId != postulation.UserId)
                {
                    if(jobOffer.Creator != userId)
                    {
                        throw new Exception("User is not authorized to view this postulation");
                    }
                    
                }
            }


                return new GetByIdResponse(
                    postulation.Id,
                    postulation.UserId,
                    postulation.JobOfferId,
                    postulation.CreatedAt,
                    postulation.State,
                    postulation.CvFileName
                );
            }
        

        //que el usuario que quiera postularse sea el mismo que inicio sesion
        // me genera un poco de dudas
        public async Task<UpdateResponse> UpdateState(Guid idUser, Guid id, UpdateRequest request, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }
            var user = await _userService.GetByIdAsync(idUser, cancellationToken);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            var jobOfferExist = await _PublicationService.PublicationExistsAsync(postulation.JobOfferId, cancellationToken);
            if (!jobOfferExist)
            {
                throw new Exception("Job offer not found");
            }
            var jobOffer = await _PublicationService.GetByIdAsync(postulation.JobOfferId, cancellationToken);

            if (user.Role != UserRole.Admin)
            {
                if (idUser != jobOffer.Creator)
                {
                    throw new Exception("User is not authorized to update this postulation");
                }
            }
            

            postulation.UpdateState(request.State);


            await _postulationRepository.UpdateState(postulation, cancellationToken);
            return new UpdateResponse(
                postulation.Id,
                postulation.UserId,
                postulation.JobOfferId,
                postulation.CreatedAt,
                postulation.State,
                postulation.CvFileName
            );
        }

        // public async Task<List<GetAllResponse>> GetAll(CancellationToken cancellationToken)
        // {
        //     var postulations = await _postulationRepository.GetAll(cancellationToken);
        //     return postulations.Select(p => new GetAllResponse(
        //         p.Id,
        //         p.UserId,
        //         p.JobOfferId,
        //         p.CreatedAt,
        //         p.State,
        //         p.CvFileName
        //     )).ToList();
        // }

        public async Task<List<GetAllResponse>> GetByUserId(Guid userId, Guid id, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(userId, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            if (user.Role != UserRole.Admin)
            {
                if (userId != id)
                {
                    throw new Exception("User is not authorized to view this postulation");
                }
            }
            
            var postulations = await _postulationRepository.GetByUserId(id, cancellationToken);
            return postulations.Select(p => new GetAllResponse(
                p.Id,
                p.UserId,
                p.JobOfferId,
                p.CreatedAt,
                p.State,
                p.CvFileName
            )).ToList();
        }

        public async Task<List<GetAllResponse>> GetByJobOfferId(Guid jobOfferId, Guid userId, CancellationToken cancellationToken)
        {
            var JobOfferExsist = await _PublicationService.PublicationExistsAsync(jobOfferId, cancellationToken);
            if (!JobOfferExsist)
            {
                throw new Exception("Job offer not found");
            }
            var user = await _userService.GetByIdAsync(userId, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var JobOffer = await _PublicationService.GetByIdAsync(jobOfferId, cancellationToken);
            
            if (user.Role != UserRole.Admin)
            {
                if (userId != JobOffer.Creator)
                {
                    throw new Exception("User is not authorized to view this postulation");
                }
            }
            var postulations = await _postulationRepository.GetByJobOfferId(jobOfferId, cancellationToken);
            return postulations.Select(p => new GetAllResponse(
                p.Id,
                p.UserId,
                p.JobOfferId,
                p.CreatedAt,
                p.State,
                p.CvFileName
            )).ToList();
        }

        public async Task Delete(Guid id, Guid idUser, CancellationToken cancellationToken)
        {
            var postulation = await _postulationRepository.GetById(id, cancellationToken);
            if (postulation == null)
            {
                throw new Exception("Postulation not found");
            }
            var user = await _userService.GetByIdAsync(idUser, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            if (user.Role != UserRole.Admin)
            {
                if (idUser != postulation.UserId)
                {
                    throw new Exception("User is not authorized to delete this postulation");
                }
            }
            //eliminar el archivo en Supabase
            if (!string.IsNullOrEmpty(postulation.CvFilePath))
            {
                await _storageService.DeleteAsync(postulation.CvFilePath);
            }


            await _postulationRepository.Delete(id, cancellationToken);
        }
    }
}