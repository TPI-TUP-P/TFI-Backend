namespace Application.DTOs.Postulation.Response
{
    public class GetByJobOfferIdPagedResponse
    {
        public List<GetByIdResponse> Items { get; set; } =[];

        public int TotalItems { get; set; }

        public int TotalPages { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }
    }
}