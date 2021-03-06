import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { get, httpDelete, post, put } from "src/helpers/httpRequest";
import { TodoBoard } from "src/interfaces/TodoBoard";
import { TodoItem } from "src/interfaces/TodoItem";

@Component({
  selector: "app-todo-boards",
  templateUrl: "./todo-boards.component.html",
  styleUrls: ["./todo-boards.component.scss"]
})
export class TodoBoardsComponent {
  @ViewChild("nameInput", { static: true }) nameInput: ElementRef;
  public todoBoards: TodoBoard[];
  private baseUrl: string;
  private http: HttpClient;
  public isSaving: boolean;
  public expandCompletedTodos: boolean;

  filterIncompleteTodos = (todo: TodoItem) => {
    return todo.isComplete;
  };

  filterCompleteTodos = (todo: TodoItem) => {
    return !todo.isComplete;
  };

  private async updateTodoBoards() {
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
    this.isSaving = false;
    this.expandCompletedTodos = true;

    this.updateTodoBoards();
  }

  toggleExpandCompletedTodos() {
    this.expandCompletedTodos = !this.expandCompletedTodos;
  }

  async handleCheck(isComplete, todoId) {
    this.isSaving = true;

    const { parsedBody: todoItem } = await get(
      this.baseUrl + "api/TodoItems/" + todoId
    );
    const body = { ...(todoItem as {}), isComplete };

    await put(this.baseUrl + "api/TodoItems/" + todoId, body);

    await this.updateTodoBoards();

    setTimeout(() => (this.isSaving = false), 1000); // responses are fast enough that this is needed to provide a better ux
  }

  async handleDeleteTodo(todoId) {
    await httpDelete(this.baseUrl + "api/TodoItems/" + todoId);
    await this.updateTodoBoards();
  }

  async handleAddTodo(boardId) {
    await post(this.baseUrl + "api/TodoItems/", {
      TodoBoardId: boardId
    });
    await this.updateTodoBoards();
  }

  async handleDeleteBoard(boardId) {
    if (confirm("Are you sure you want to delete this board?")) {
      await httpDelete(this.baseUrl + "api/TodoBoards/" + boardId);
      await this.updateTodoBoards();
    }
  }

  async handleNameChanged(name, id) {
    this.isSaving = true;

    const { parsedBody: todoBoard } = await get(
      this.baseUrl + "api/TodoBoards/" + id
    );
    const body = { ...(todoBoard as {}), name };

    await put(this.baseUrl + "api/TodoBoards/" + id, body);

    setTimeout(() => (this.isSaving = false), 1000); // responses are fast enough that this is needed to provide a better ux
  }

  async handleContentChanged(content, todoId) {
    this.isSaving = true;

    const { parsedBody: todoItem } = await get(
      this.baseUrl + "api/TodoItems/" + todoId
    );
    const body = { ...(todoItem as {}), content };

    await put(this.baseUrl + "api/TodoItems/" + todoId, body);

    setTimeout(() => (this.isSaving = false), 1000); // responses are fast enough that this is needed to provide a better ux
  }

  async handleAddBoard() {
    await post(this.baseUrl + "api/TodoBoards/", {});
    await this.updateTodoBoards();
  }
}
