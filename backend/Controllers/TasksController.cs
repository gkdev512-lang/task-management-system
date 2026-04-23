using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET MY TASKS
        [Authorize]
        [HttpGet("my-tasks")]
        public async Task<IActionResult> GetMyTasks()
        {
            var userId = User.FindFirst("UserId")?.Value;
            if (!int.TryParse(userId, out var parsedUserId))
                return Unauthorized("Invalid token");

            var tasks = await _context.Tasks
                .Where(t => t.UserId == parsedUserId)
                .ToListAsync();

            return Ok(tasks);
        }

        // 2. GET SINGLE TASK BY ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        // 3. CREATE A TASK
        [Authorize]
        [HttpPost]
        public IActionResult Create(CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest("Title is required.");

            var userId = User.FindFirst("UserId")?.Value;
            if (!int.TryParse(userId, out var parsedUserId))
                return Unauthorized("Invalid token");

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                UserId = parsedUserId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        // 4. UPDATE A TASK
        [HttpPut("{id}")]
        public IActionResult Update(int id, CreateTaskDto dto)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;

            _context.SaveChanges();

            return Ok(task);
        }

        // 5. DELETE A TASK
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return Ok("Task deleted successfully");
        }

        // 6. MARK TASK AS COMPLETE
        [HttpPatch("{id}/complete")]
        public IActionResult MarkComplete(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();

            task.IsCompleted = true;
            _context.SaveChanges();

            return Ok(task);
        }
    }
}
