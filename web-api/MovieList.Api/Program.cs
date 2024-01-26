using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieList.Api.Persistence;
using MovieList.Api.Services;
using MovieList.Api.Services.Impl;

namespace MovieList.Api
{
    public class Program
    {
        private static bool IsOriginAllowed(string origin)
        {
            var uri = new Uri(origin);
            return uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase);
        }
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;
            
            //Add cors policy

            var MyAllowSpecificOrigins = "CorsPolicy";
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.SetIsOriginAllowed(IsOriginAllowed)
                                       .AllowAnyHeader()
                                       .AllowCredentials()
                                       .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
                                        .SetPreflightMaxAge(TimeSpan.FromDays(30));
                                      /* WithOrigins("http://localhost:5173/*",
                                                           "https://localhost:5173/*");*/
                                  });
            });
          

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("DbConnection"));
            });
            builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;

            })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

            builder.Services.AddControllers();
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();
            builder.Services.AddHttpContextAccessor();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();    
            app.UseAuthorization(); 
            app.UseCors(MyAllowSpecificOrigins);

            app.MapControllers();

            app.Run();
        }
    }
}
