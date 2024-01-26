namespace MovieList.Api.Dto
{
    public class MovieModel
    {
        public string Title { get; set; }
        public int PublishingYear { get; set; }
        public string Poster { get; set; }
        public byte[] image { get; set; }
    }
}
