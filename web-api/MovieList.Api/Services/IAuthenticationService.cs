using MovieList.Api.Dto;

namespace MovieList.Api.Services
{
    public interface IAuthenticationService
    {
        Task Login(LoginRequest request);
    }
}