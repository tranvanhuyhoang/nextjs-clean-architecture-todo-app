import { eq } from "drizzle-orm";

import { db } from "@/drizzle";
import { todos } from "@/drizzle/schema";
import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { Todo } from "@/src/entities/models/todo";
import type { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import type { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";

export class TodosRepository implements ITodosRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService
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
            () => query.execute()
          );

          return todo;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
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
            () => query.execute()
          );
          return usersTodos;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
