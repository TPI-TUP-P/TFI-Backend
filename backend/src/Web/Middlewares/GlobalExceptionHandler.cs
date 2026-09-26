using System.Security.Authentication;
using Application.Exceptions;
using Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
// Usá los namespaces de tus capas:
// using TuProyecto.Application.Exceptions;
// using TuProyecto.Domain.Exceptions;

namespace TuProyecto.WebAPI.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "Ocurrió una excepción de tipo {Type}: {Message}", exception.GetType().Name, exception.Message);

            var (statusCode, title, detail) = exception switch
            {
                InvalidCredentialsException => (StatusCodes.Status401Unauthorized, "No autorizado", "El correo o la contraseña son incorrectos."),
                UnauthorizedException => (StatusCodes.Status401Unauthorized, "No autorizado", "No tenés permisos para realizar esta acción."),

                NotFoundException => (StatusCodes.Status404NotFound, "No encontrado", "No pudimos encontrar la información solicitada."),

                EmailAlredyExistsException => (StatusCodes.Status409Conflict, "Conflicto", "El email ingresado ya se encuentra registrado."),
                PhoneAlredyExistsException => (StatusCodes.Status409Conflict, "Conflicto", "El teléfono ingresado ya se encuentra registrado."),

                FieldEmptyException => (StatusCodes.Status400BadRequest, "Validación", "Hay campos obligatorios que están vacíos."),
                InvalidEmailException => (StatusCodes.Status400BadRequest, "Validación", "El formato del correo electrónico no es válido."),
                InvalidFormatException => (StatusCodes.Status400BadRequest, "Validación", "El formato de los datos es incorrecto."),
                InvalidLengthException => (StatusCodes.Status400BadRequest, "Validación", "La longitud de los datos ingresados no es válida."),
                NegativeNumberException or 
                NegativeNumbersException => (StatusCodes.Status400BadRequest, "Validación", "No se permiten valores numéricos negativos."),
                OutRangeException => (StatusCodes.Status400BadRequest, "Validación", "El valor se encuentra fuera del rango permitido."),

                BadRequestException => (StatusCodes.Status400BadRequest, "Petición incorrecta", "Hubo un error al procesar los datos enviados."),
                BaseApplicationException or 
                DomainException => (StatusCodes.Status400BadRequest, "Error de operación", "No se pudo completar la operación solicitada."),

                _ => (StatusCodes.Status500InternalServerError, "Error interno", "Ocurrió un error inesperado en el servidor.")
            };

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = detail, 
                Instance = httpContext.Request.Path
            };

            httpContext.Response.StatusCode = statusCode;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true; 
        }
    }
}