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
import { TodoItem } from "src/interfaces/TodoItem";

@Component({
  selector: "todo-item-content-input",
  templateUrl: "./todo-item-content-input.component.html",
  styleUrls: ["./todo-item-content-input.component.scss"]
})
export class TodoItemContentInputComponent implements OnInit {
  @Input("todoItem") todoItem: TodoItem;
  @Output() contentChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild("contentInput", { static: true }) contentInput: ElementRef;

  ngOnInit() {
    fromEvent(this.contentInput.nativeElement, "keyup")
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.contentChanged.emit(text);
      });
  }
}
