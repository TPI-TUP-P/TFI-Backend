namespace Infrastructure.Configurations;

public class SupabaseOptions
{
    public const string Section = "Supabase";

    public string Url { get; set; } = string.Empty;

    public string Key { get; set; } = string.Empty;

    public string Bucket { get; set; } = string.Empty;
}