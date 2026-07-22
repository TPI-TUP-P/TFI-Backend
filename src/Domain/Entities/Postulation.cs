using System;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Domain.Enums;

namespace Domain.Entities
{
    public class Postulation
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobOfferId { get; set; }
        public DateTime CreatedAt { get; set; }
        public EnumState State { get; set; }
        public IFormFile CV { get; set; } // propiedad para almacenar el archivo del CV, puede ser null si no se sube un CV
        //faltaria una propiedad para subir el cv?
        
    

        public Postulation(Guid userId, Guid jobOfferId, IFormFile cv)
        {
            ValidateProperties(userId, jobOfferId, cv);
            Id = Guid.NewGuid();
            UserId = userId;
            JobOfferId = jobOfferId;
            CV = cv;
            CreatedAt = DateTime.UtcNow;
            State = EnumState.Pending;
        }
        // el state no lo deberia manejar el que creo la oferta de trabajo

        public void ValidateProperties(Guid userId, Guid jobOfferId, IFormFile cv)
        {
            if (userId==Guid.Empty)
            {
                throw new Exception("UserId is required");
            }
            if (jobOfferId==Guid.Empty)
            {
                throw new Exception("JobOfferId is required");
            }
            if (cv == null || cv.Length == 0)
            {
                throw new Exception("CV file is required");
            }
        }

        public void UpdateState(EnumState newState)
        {
            State = newState;
        }


        //aca una funcion para poder modificar el cv, o prefieren hacer un solo cv y que quede adjunto a el user
    }
}