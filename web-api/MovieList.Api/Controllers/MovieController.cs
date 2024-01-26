using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieList.Api.Dto;
using MovieList.Api.Persistence;
using MovieList.Api.Services;

namespace MovieList.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : Controller
    {
        /*private readonly IMovieService _movieService;*/
        AppDbContext _db;
        public MovieController(AppDbContext db)
        {
            _db = db;
        }
       
        [HttpGet]
        public async Task<IReadOnlyList<Movie>> GetAllMovies()
        {
            return await _db.Movie.ToListAsync();

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Movie> GetMovieById(long id)
        {
            return await _db.Movie.FirstOrDefaultAsync(x=>x.Id==id);
           
        }

        //save image data in Files
        [HttpPost]
        public async Task<IActionResult> AddMovie([FromForm] IFormCollection form)
        {
            var file = form.Files[0];
            var title = form["title"];
            var publishingYear = int.Parse(form["publishingYear"]);

            //check if movie already exists with this title
            var isMovieExist = await _db.Movie.Where(x=>x.Title.Equals(title)).AnyAsync();

            if(isMovieExist)
            {
                return BadRequest("Movie exists with this title");
            }

            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                Movie movie = new Movie()
                {
                    Title = title,
                    PublishingYear = publishingYear,
                    Poster=memoryStream.ToArray()
                };
                _db.Movie.Add(movie);
                await _db.SaveChangesAsync();
            }
            return Ok();
           
        }

        //save base64 images in request
        [HttpPost]
        [Route("save")]
        public async Task SaveMovie(MovieModel model)
        {
            var movie = new Movie
            {
                Title = model.Title,
                PublishingYear = model.PublishingYear,
                //convert base64 to byte array
                Poster = Convert.FromBase64String(model.Poster.Split(",")[1])
            };
            
            _db.Movie.Add(movie);
            await _db.SaveChangesAsync();
        }
    }
}
