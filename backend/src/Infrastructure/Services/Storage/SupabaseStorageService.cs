using System.Net.Http.Headers;
using Application.Interfaces;
using Infrastructure.Configurations;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services.Storage;

public class SupabaseStorageService : IStorageService
{
    private readonly HttpClient _httpClient;
    private readonly SupabaseOptions _options;

    public SupabaseStorageService(
        IHttpClientFactory httpClientFactory,
        IOptions<SupabaseOptions> options)
    {
        _httpClient = httpClientFactory.CreateClient();
        _options = options.Value;
    }

    public async Task<string> UploadAsync(IFormFile file)
    {
        // valido el archivo, que se seleccione uno, que no supere los 5 MB y que sea tipo .pdf 
        ValidateFile(file);
        // creo la ruta del archivo, genera una ruta unica en forma de string para guardar un archivo
        var objectPath = GenerateObjectPath();
        // esto es la ruta URL, con el url del supabase, la ruta fija del edpoint, nombre de buckt y la ruta unica del archivo
        var url =
            $"{_options.Url}/storage/v1/object/{_options.Bucket}/{objectPath}";
        //URL completa que apunta al archivo dentro del bucket.
        
        
        //guardo el archivo 
        using var stream = file.OpenReadStream();
        //lo preparo para enviarlo
        using var content = new StreamContent(stream);

        //describe el tipo de archivo
        content.Headers.ContentType =
            new MediaTypeHeaderValue(file.ContentType);


        //se crea y arma el objeto que reprecenta la peticion
        var request = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = content
        };


        //header de autenticacion
        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.Key);


        //header de configuracion
        request.Headers.Add("apikey", _options.Key);
        request.Headers.Add("x-upsert", "false");
        request.Headers.Add("cache-control", "3600");

        //se envia la peticion al servidor
        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();

            throw new Exception(
                $"Error al subir el archivo a Supabase: {error}");
        }

        return objectPath;
    }

    public async Task DeleteAsync(string path)
    {
        //direccion completa del archivo en el servidor/supabase
        var url =
            $"{_options.Url}/storage/v1/object/{_options.Bucket}/{path}";

        //se crea la peticion delete
        var request = new HttpRequestMessage(HttpMethod.Delete, url);

        //header de autenticacion
        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.Key);


        //header de configuracion
        request.Headers.Add("apikey", _options.Key);

        //se hace la peticion
        var response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();
    }

    private static void ValidateFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("Debe seleccionar un archivo.");

        if (file.Length > 5 * 1024 * 1024)
            throw new ArgumentException("El archivo supera los 5 MB.");

        if (file.ContentType != "application/pdf")
            throw new ArgumentException("Solo se permiten archivos PDF.");
    }

    private static string GenerateObjectPath()
    {
        var now = DateTime.UtcNow;

        return $"{now:yyyy/MM}/postulations/{Guid.NewGuid()}.pdf";
    }
}