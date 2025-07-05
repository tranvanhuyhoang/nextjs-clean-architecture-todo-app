import { eq } from "drizzle-orm";

import { db, type Transaction } from "@/drizzle";
import { todos } from "@/drizzle/schema";
import type { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import type { Todo, TodoInsert } from "@/src/entities/models/todo";
import type { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import type { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { DatabaseOperationError } from "@/src/entities/errors/common";

export class TodosRepository implements ITodosRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService,
  ) {}

  async getTodo(id: number): Promise<Todo | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "TodosRepository > getTodo" },
      async () => {
        try {
          const query = db.query.todos.findFirst({
            where: eq(todos.id, id),
          });

          const todo = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );

          return todo;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }

  async getTodosForUser(userId: string): Promise<Todo[]> {
    return await this.instrumentationService.startSpan(
      { name: "TodosRepository > getTodosForUser" },
      async () => {
        try {
          const query = db.query.todos.findMany({
            where: eq(todos.userId, userId),
          });

          const usersTodos = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );
          return usersTodos;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }

  async createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo> {
    const invoker = tx ?? db;

    return await this.instrumentationService.startSpan(
      { name: "TodosRepository > createTodo" },
      async () => {
        try {
          const query = invoker.insert(todos).values(todo).returning();

          const [created] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );

          if (created) {
            return created;
          } else {
            throw new DatabaseOperationError("Cannot create todo");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }

  async updateTodo(
    id: number,
    input: Partial<TodoInsert>,
    tx?: Transaction,
  ): Promise<Todo> {
    const invoker = tx ?? db;

    return await this.instrumentationService.startSpan(
      { name: "TodosRepository > updateTodo" },
      async () => {
        try {
          // Check if todo exists first
          const existingTodo = await this.getTodo(id);
          if (!existingTodo) {
            throw new DatabaseOperationError(`Todo with ID ${id} not found`);
          }

          const query = invoker
            .update(todos)
            .set(input)
            .where(eq(todos.id, id))
            .returning();

          const [updated] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );

          if (updated) {
            return updated;
          } else {
            throw new DatabaseOperationError(
              `Failed to update todo with ID ${id}`,
            );
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }

  async deleteTodo(id: number, tx?: Transaction): Promise<void> {
    const invoker = tx ?? db;

    await this.instrumentationService.startSpan(
      { name: "TodosRepository > deleteTodo" },
      async () => {
        try {
          const query = invoker
            .delete(todos)
            .where(eq(todos.id, id))
            .returning();

          const [deleted] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );

          if (!deleted) {
            throw new DatabaseOperationError(`Todo with ID ${id} not found`);
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }
}
