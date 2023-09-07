﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parcial.Models;

namespace Parcial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public MascotaController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/Mascota
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mascotum>>> GetMascota()
        {
          if (_context.Mascota == null)
          {
              return NotFound();
          }
            return await _context.Mascota.ToListAsync();
        }

        // GET: api/Mascota/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mascotum>> GetMascotum(int id)
        {
          if (_context.Mascota == null)
          {
              return NotFound();
          }
            var mascotum = await _context.Mascota.FindAsync(id);

            if (mascotum == null)
            {
                return NotFound();
            }

            return mascotum;
        }

        // PUT: api/Mascota/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMascotum(int id, Mascotum mascotum)
        {
            if (id != mascotum.IdMascota)
            {
                return BadRequest();
            }

            _context.Entry(mascotum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MascotumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Mascota
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mascotum>> PostMascotum(Mascotum mascotum)
        {
          if (_context.Mascota == null)
          {
              return Problem("Entity set 'VeterinariaContext.Mascota'  is null.");
          }
            _context.Mascota.Add(mascotum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMascotum", new { id = mascotum.IdMascota }, mascotum);
        }

        // DELETE: api/Mascota/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascotum(int id)
        {
            if (_context.Mascota == null)
            {
                return NotFound();
            }
            var mascotum = await _context.Mascota.FindAsync(id);
            if (mascotum == null)
            {
                return NotFound();
            }

            _context.Mascota.Remove(mascotum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MascotumExists(int id)
        {
            return (_context.Mascota?.Any(e => e.IdMascota == id)).GetValueOrDefault();
        }
    }
}
