using GestionReservasHotelAPI.Database;
using Microsoft.EntityFrameworkCore;

namespace GestionReservasHotelAPI;

public class Startup
{
    private IConfiguration Configuration { get; }
    //Esta variable accede al appseseting.Development Json y se pasa en services.AddDbContext

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        //Add DbContext (comienza configuracion de base de datos)
        services.AddDbContext<GestionReservasHotelContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        // Add custom services


        // Add AutoMapper

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
