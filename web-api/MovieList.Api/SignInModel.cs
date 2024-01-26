using System.Text.Json.Serialization;

namespace MovieList.Api
{
    public class SignInModel
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
