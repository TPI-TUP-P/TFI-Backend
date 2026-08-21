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
            var jobOfferExist = await _PublicationService.PublicationExistsAsync(request.JobOfferId, cancellationToken);
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

            await _PublicationService.AddApplicantAsync(request.JobOfferId, cancellationToken);
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
                    if (jobOffer.Creator != userId)
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

        public async Task<int> GetCountByUserId(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(userId, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var count = await _postulationRepository.GetCountByUserId(userId, cancellationToken);
            return count;
        }


        public async Task<string> GetCvDownloadUrl(Guid id, Guid idUser, CancellationToken cancellationToken)
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
                // Puede descargar: el dueño del job, o el propio postulante
                if (idUser != jobOffer.Creator && idUser != postulation.UserId)
                {
                    throw new Exception("User is not authorized to download this CV");
                }
            }

            if (string.IsNullOrEmpty(postulation.CvFilePath))
            {
                throw new Exception("CV not found for this postulation");
            }

            var url = await _storageService.GetSignedUrlAsync(postulation.CvFilePath);
            return url;
        }



        public async Task<GetCountByStateResponse> GetCountByInterviewerId(Guid interviewerId, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(interviewerId, cancellationToken);

            if (user == null)
                throw new Exception("User not found");

            var counts = await _postulationRepository
                .GetCountByInterviewerId(interviewerId, cancellationToken);

            return new GetCountByStateResponse
            {
                Pending = counts.GetValueOrDefault(EnumState.Pending),
                Accepted = counts.GetValueOrDefault(EnumState.Accepted),
                Rejected = counts.GetValueOrDefault(EnumState.Rejected)
            };
        }


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

         public async Task<GetByJobOfferIdPagedResponse> GetByJobOfferId(
            Guid jobOfferId,
            int page,
            int pageSize,
            Guid userId,
            CancellationToken cancellationToken)
        {
            if (page < 1)
            {
                throw new ArgumentException(
                    "Page must be greater than 0.");
            }

            if (pageSize < 1)
            {
                throw new ArgumentException(
                    "PageSize must be greater than 0.");
            }

            // Máximo 20 postulaciones por página
            if (pageSize > 20)
            {
                pageSize = 20;
            }

            // Verificar que exista la oferta
            var jobOfferExists =
                await _PublicationService.PublicationExistsAsync(
                    jobOfferId,
                    cancellationToken);

            if (!jobOfferExists)
            {
                throw new Exception("Job offer not found");
            }

            // Buscar usuario
            var user = await _userService.GetByIdAsync(
                userId,
                cancellationToken);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Buscar oferta
            var jobOffer = await _PublicationService.GetByIdAsync(
                jobOfferId,
                cancellationToken);

            // Verificar autorización
            if (user.Role != UserRole.Admin)
            {
                if (userId != jobOffer.Creator)
                {
                    throw new UnauthorizedAccessException(
                        "User is not authorized to view this postulation");
                }
            }

            // Obtener postulaciones paginadas
            var postulations =
                await _postulationRepository.GetByJobOfferId(
                    jobOfferId,
                    page,
                    pageSize,
                    cancellationToken);

            // Convertir Postulation -> GetByIdResponse
            var items = postulations.Items
                .Select(p => new GetByIdResponse(
                    p.Id,
                    p.UserId,
                    p.JobOfferId,
                    p.CreatedAt,
                    p.State,
                    p.CvFileName
                ))
                .ToList();

            // Crear respuesta paginada
            return new GetByJobOfferIdPagedResponse
            {
                Items = items,

                TotalItems = postulations.TotalItems,

                TotalPages = postulations.TotalPages,

                CurrentPage = postulations.CurrentPage,

                PageSize = postulations.PageSize
            };
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
            await _PublicationService.DeleteApplicantAsync(postulation.JobOfferId, cancellationToken);
        }
    }
}