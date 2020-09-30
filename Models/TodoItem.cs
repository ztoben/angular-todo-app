using System.ComponentModel.DataAnnotations;

public class TodoItem
{
    [Key]
    public long TodoId { get; set; }
    public long TodoBoardId { get; set; }
    public string Content { get; set; }
    public bool IsComplete { get; set; }
}