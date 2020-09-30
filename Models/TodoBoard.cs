using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class TodoBoard
{
    [Key]
    public long Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<TodoItem> TodoItems { get; set; }
}