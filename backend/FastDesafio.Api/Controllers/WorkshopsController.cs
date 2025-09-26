using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using FastDesafio.Infrastructure;
using FastDesafio.Core.Models;

namespace FastDesafio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkshopsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkshopsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/workshops
        [HttpGet]
        public IActionResult GetAll()
        {
            var workshops = _context.Workshops
                .Include(w => w.Presencas)
                .ThenInclude(p => p.Colaborador)
                .ToList();

            return Ok(workshops);
        }

        // GET api/workshops/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workshop = _context.Workshops
                .Include(w => w.Presencas)
                .ThenInclude(p => p.Colaborador)
                .FirstOrDefault(w => w.Id == id);

            if (workshop == null)
                return NotFound();

            return Ok(workshop);
        }

        // POST api/workshops
        [HttpPost]
        public IActionResult Create([FromBody] Workshop workshop)
        {
            _context.Workshops.Add(workshop);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = workshop.Id }, workshop);
        }

        // PUT api/workshops/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Workshop updated)
        {
            var workshop = _context.Workshops.Find(id);
            if (workshop == null)
                return NotFound();

            workshop.Nome = updated.Nome;
            workshop.DataRealizacao = updated.DataRealizacao;
            workshop.Descricao = updated.Descricao;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE api/workshops/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var workshop = _context.Workshops.Find(id);
            if (workshop == null)
                return NotFound();

            _context.Workshops.Remove(workshop);
            _context.SaveChanges();

            return NoContent();
        }

        // POST api/workshops/{id}/participantes
        public class AddParticipanteRequest
        {
            public int ColaboradorId { get; set; }
        }

        [HttpPost("{id}/participantes")]
        public IActionResult AddParticipante(int id, [FromBody] AddParticipanteRequest request)
        {
            var workshop = _context.Workshops.Find(id);
            var colaborador = _context.Colaboradores.Find(request.ColaboradorId);

            if (workshop == null || colaborador == null)
                return NotFound("Workshop ou colaborador não encontrado");

            if (_context.Presencas.Any(p => p.WorkshopId == id && p.ColaboradorId == request.ColaboradorId))
                return BadRequest("Colaborador já está registrado nesse workshop");

            var presenca = new Presenca
            {
                WorkshopId = id,
                ColaboradorId = request.ColaboradorId,
                Registro = DateTime.UtcNow
            };

            _context.Presencas.Add(presenca);
            _context.SaveChanges();

            return Ok(presenca);
        }

        // GET api/workshops/{id}/participantes
        [HttpGet("{id}/participantes")]
        public IActionResult GetParticipantes(int id)
        {
            var workshop = _context.Workshops
                .Include(w => w.Presencas)
                .ThenInclude(p => p.Colaborador)
                .FirstOrDefault(w => w.Id == id);

            if (workshop == null)
                return NotFound("Workshop não encontrado");

            var participantes = workshop.Presencas.Select(p => new
            {
                p.Colaborador.Id,
                p.Colaborador.Nome
            });

            return Ok(participantes);
        }
        // DELETE api/workshops/{id}/participantes/{colaboradorId}
        [HttpDelete("{id}/participantes/{colaboradorId}")]
        public IActionResult RemoveParticipante(int id, int colaboradorId)
        {
            var presenca = _context.Presencas
                .FirstOrDefault(p => p.WorkshopId == id && p.ColaboradorId == colaboradorId);

            if (presenca == null)
                return NotFound("Participação não encontrada");

            _context.Presencas.Remove(presenca);
            _context.SaveChanges();

            return NoContent();
        }
        // GET api/workshops/participacao-colaboradores
        [HttpGet("participacao-colaboradores")]
        public IActionResult GetParticipacaoColaboradores()
        {
            var participacao = _context.Colaboradores
                .Select(c => new
                {
                    Colaborador = c.Nome,
                    TotalWorkshops = _context.Presencas.Count(p => p.ColaboradorId == c.Id)
                })
                .ToList();

            return Ok(participacao);
        }
        // GET api/workshops/participacao-workshops
        [HttpGet("participacao-workshops")]
        public IActionResult GetParticipacaoWorkshops()
        {
            var participacao = _context.Workshops
                .Select(w => new {
                    Workshop = w.Nome,
                    TotalColaboradores = _context.Presencas.Count(p => p.WorkshopId == w.Id)
                })
                .ToList();

            return Ok(participacao);
        }



    }   
}