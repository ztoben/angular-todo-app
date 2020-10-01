import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { get, put } from "src/helpers/httpRequest";
import { TodoBoard } from "src/interfaces/TodoBoard";

@Component({
  selector: "app-todo-boards",
  templateUrl: "./todo-boards.component.html",
  styleUrls: ["./todo-boards.component.css"]
})
export class TodoBoardsComponent {
  @ViewChild("nameInput", { static: true }) nameInput: ElementRef;
  public todoBoards: TodoBoard[];
  private baseUrl: string;
  private http: HttpClient;
  public isSaving: boolean;

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

    this.updateTodoBoards();
  }

  async onCheck(isComplete, todoId) {
    this.isSaving = true;

    const { parsedBody: todoItem } = await get(
      this.baseUrl + "api/TodoItems/" + todoId
    );
    const body = { ...(todoItem as {}), isComplete };

    await put(this.baseUrl + "api/TodoItems/" + todoId, body);

    await this.updateTodoBoards();

    setTimeout(() => (this.isSaving = false), 1000); // responses are fast enough that this is needed to provide a better ux
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
}
