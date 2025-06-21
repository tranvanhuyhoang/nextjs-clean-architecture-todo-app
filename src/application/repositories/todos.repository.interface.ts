import type { Todo, TodoInsert } from "@/src/entities/models/todo";

export interface ITodosRepository {
  getTodo(id: number): Promise<Todo | undefined>;
  getTodosForUser(userId: string): Promise<Todo[]>;
  createTodo(todo: TodoInsert, tx?: unknown): Promise<Todo>;
}
