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
        //es para ver en nombre real de archivo(el nombre que subio el usuario), no el path, para mostrarlo en la vista
        public string CvFileName { get; private set; }
        //es el path del archivo, para poder eliminarlo en supabase, es el que se guarda en la base de datos
        public string CvFilePath { get; private set; }
        public DateTime CreatedAt { get; set; }
        public EnumState State { get; set; }
        
        
        
    

        public Postulation(Guid userId, Guid jobOfferId, string cvFileName, string cvFilePath)
        {
            ValidateProperties(userId, jobOfferId, cvFileName, cvFilePath);
            Id = Guid.NewGuid();
            UserId = userId;
            JobOfferId = jobOfferId;
            CvFileName = cvFileName;
            CvFilePath = cvFilePath;
            CreatedAt = DateTime.UtcNow;
            State = EnumState.Pending;
        }
        // el state no lo deberia manejar el que creo la oferta de trabajo

        public void ValidateProperties(Guid userId, Guid jobOfferId, string cvFileName, string cvFilePath)
        {
            if (userId==Guid.Empty)
            {
                throw new Exception("UserId is required");
            }
            if (jobOfferId==Guid.Empty)
            {
                throw new Exception("JobOfferId is required");
            }
            if (cvFileName == null || cvFileName.Length == 0)
            {
                throw new Exception("CV file name is required");
            }
            if (cvFilePath == null || cvFilePath.Length == 0)
            {
                throw new Exception("CV file path is required");
            }
        }

        public void UpdateState(EnumState newState)
        {
            State = newState;
        }


        //aca una funcion para poder modificar el cv, o prefieren hacer un solo cv y que quede adjunto a el user
    }
}