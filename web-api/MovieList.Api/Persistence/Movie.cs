using System.Buffers.Text;
using System.Reflection.Metadata;

namespace MovieList.Api.Persistence
{
    public class Movie
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int PublishingYear { get; set; }
        public byte[] Poster { get; set; }
       /* public long ImageId { get; set; }
        public virtual Image Poster { get; set; }*/
    }
}
