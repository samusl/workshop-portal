using Microsoft.EntityFrameworkCore;
using FastDesafio.Core.Models;

namespace FastDesafio.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Presenca> Presencas { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<Presenca>().HasKey(p => new { p.WorkshopId, p.ColaboradorId });
        }
        
    }
}
