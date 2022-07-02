using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using MediatR;
using Application.Persons;
using Application.Core;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
    IConfiguration config)
    {
      services.AddDbContext<DataContext>(opt =>
    {
      opt.UseSqlite(config.GetConnectionString("DefaultConection"));
    });

      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
               {
                 policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
               });
      });

      services.AddMediatR(typeof(List.Handler).Assembly);
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);
      return services;
    }
  }
}