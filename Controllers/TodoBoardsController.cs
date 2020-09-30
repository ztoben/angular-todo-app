using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KeepClone.Models;

namespace KeepClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoBoardsController : ControllerBase
    {
        private readonly BoardContext _context;

        public TodoBoardsController(BoardContext context)
        {
            _context = context;
        }

        // GET: api/TodoBoards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoBoard>>> GetTodoBoards()
        {
            return await _context.TodoBoards.Include(b => b.TodoItems).ToListAsync();
        }

        // GET: api/TodoBoards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoBoard>> GetTodoBoard(long id)
        {
            var todoBoard = await _context.TodoBoards.Include(b => b.TodoItems).FirstOrDefaultAsync(i => i.Id == id);

            if (todoBoard == null)
            {
                return NotFound();
            }

            return todoBoard;
        }

        // PUT: api/TodoBoards/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoBoard(long id, TodoBoard todoBoard)
        {
            if (id != todoBoard.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoBoard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoBoardExists(id))
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

        // POST: api/TodoBoards
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TodoBoard>> PostTodoBoard(TodoBoard todoBoard)
        {
            _context.TodoBoards.Add(todoBoard);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoBoard), new { id = todoBoard.Id }, todoBoard);
        }

        // DELETE: api/TodoBoards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoBoard>> DeleteTodoBoard(long id)
        {
            var todoBoard = await _context.TodoBoards.FindAsync(id);
            if (todoBoard == null)
            {
                return NotFound();
            }

            _context.TodoBoards.Remove(todoBoard);
            await _context.SaveChangesAsync();

            return todoBoard;
        }

        private bool TodoBoardExists(long id)
        {
            return _context.TodoBoards.Any(e => e.Id == id);
        }
    }
}
