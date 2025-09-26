namespace FastDesafio.Core.Models
{
    public class Workshop{
        public int Id {get; set;}
        public string Nome {get; set;}
        public DateTime DataRealizacao {get; set;}
        public string Descricao {get; set;}
        public ICollection<Presenca> Presencas { get; set; } = new List<Presenca>();

    }
}