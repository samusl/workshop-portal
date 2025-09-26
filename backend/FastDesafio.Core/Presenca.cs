using System.Text.Json.Serialization;

namespace FastDesafio.Core.Models
{
    public class Presenca
    {
        public int WorkshopId { get; set; }

        [JsonIgnore] // <- evita o loop
        public Workshop Workshop { get; set; }

        public int ColaboradorId { get; set; }
        public Colaborador Colaborador { get; set; }

        public DateTime Registro { get; set; } = DateTime.UtcNow;
    }
}