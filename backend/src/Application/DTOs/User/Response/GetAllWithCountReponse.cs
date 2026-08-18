namespace Application.DTOs.User.Response;

public record GetAllWithCountResponse(
    IReadOnlyList<GetAllResponse> Items,
    int TotalCount
);