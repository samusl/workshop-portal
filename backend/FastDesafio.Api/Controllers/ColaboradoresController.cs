using Microsoft.AspNetCore.Mvc;
using FastDesafio.Infrastructure;
using FastDesafio.Core.Models;

namespace FastDesafio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ColaboradoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public ColaboradoresController(AppDbContext context)
    {
        _context = context;
    }

    // GET api/colaboradores
    [HttpGet]
    public IActionResult GetAll()
    {
        var colaboradores = _context.Colaboradores.ToList();
        return Ok(colaboradores);
    }

    // GET api/colaboradores/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var colaborador = _context.Colaboradores.Find(id);
        if (colaborador == null)
            return NotFound();

        return Ok(colaborador);
    }

    // POST api/colaboradores
    [HttpPost]
    public IActionResult Create([FromBody] Colaborador colaborador)
    {
        _context.Colaboradores.Add(colaborador);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetById), new { id = colaborador.Id }, colaborador);
    }

    // PUT api/colaboradores/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Colaborador updated)
    {
        var colaborador = _context.Colaboradores.Find(id);
        if (colaborador == null)
            return NotFound();

        colaborador.Nome = updated.Nome;
        _context.SaveChanges();

        return NoContent();
    }

    // DELETE api/colaboradores/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var colaborador = _context.Colaboradores.Find(id);
        if (colaborador == null)
            return NotFound();

        _context.Colaboradores.Remove(colaborador);
        _context.SaveChanges();

        return NoContent();
    }
}
