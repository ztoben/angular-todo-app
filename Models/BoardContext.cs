using Microsoft.EntityFrameworkCore;

namespace KeepClone.Models
{
    public class BoardContext : DbContext
    {
        public BoardContext(DbContextOptions<BoardContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=Boards.db");

        public DbSet<TodoBoard> TodoBoards { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}