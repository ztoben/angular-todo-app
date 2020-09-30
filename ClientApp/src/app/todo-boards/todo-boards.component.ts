import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { get, put } from "src/helpers/httpRequest";

@Component({
  selector: "app-todo-boards",
  templateUrl: "./todo-boards.component.html",
  styleUrls: ["./todo-boards.component.css"]
})
export class FetchDataComponent {
  public todoBoards: TodoBoard[];
  private baseUrl: string;
  private http: HttpClient;

  private updateTodoBoards() {
    this.http.get<TodoBoard[]>(this.baseUrl + "api/TodoBoards").subscribe(
      result => {
        this.todoBoards = result;
      },
      error => console.error(error)
    );
  }

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;

    this.updateTodoBoards();
  }

  async onCheck(isComplete, todoId) {
    const { parsedBody: todoItem } = await get(
      this.baseUrl + "api/TodoItems/" + todoId
    );
    const body = { ...(todoItem as {}), isComplete };

    await put(this.baseUrl + "api/TodoItems/" + todoId, body);

    this.updateTodoBoards();
  }
}

interface TodoBoard {
  id: number;
  name: string;
  todoItems: TodoItem[];
}

interface TodoItem {
  todoId: number;
  todoBoardId: number;
  content: string;
  isComplete: boolean;
}
