namespace FastDesafio.Core.Models
{
    public class Colaborador
    {
        public int Id {get; set;}
        public string Nome {get; set;}
        public ICollection<Presenca> Presencas { get; set; } = new List<Presenca>();


    }
    
}