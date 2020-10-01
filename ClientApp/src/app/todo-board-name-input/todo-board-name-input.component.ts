import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { TodoBoard } from "src/interfaces/TodoBoard";

@Component({
  selector: "todo-board-name-input",
  templateUrl: "./todo-board-name-input.component.html",
  styleUrls: ["./todo-board-name-input.component.css"]
})
export class TodoBoardNameInputComponent implements OnInit {
  @Input("todoBoard") todoBoard: TodoBoard;
  @Output() nameChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild("nameInput", { static: true }) nameInput: ElementRef;

  ngOnInit() {
    fromEvent(this.nameInput.nativeElement, "keyup")
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.nameChanged.emit(text);
      });
  }
}
