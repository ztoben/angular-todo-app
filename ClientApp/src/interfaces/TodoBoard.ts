import { TodoItem } from "./TodoItem";

export interface TodoBoard {
  id: number;
  name: string;
  todoItems: TodoItem[];
}
