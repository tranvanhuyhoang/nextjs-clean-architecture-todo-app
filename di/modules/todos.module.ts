import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import { getTodosForUserUseCase } from "@/src/application/use-cases/todos/get-todos-for-user.use-case";
import { TodosRepository } from "@/src/infrastructure/repositories/todos.repository";
import { getTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-todos-for-user.controller";
import { createTodoUseCase } from "@/src/application/use-cases/todos/create-todo.use-case";
import { createTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";

export function createTodosModule() {
  const todosModule = createModule();

  if (process.env.NODE_ENV === "test") {
    // todosModule.bind(DI_SYMBOLS.ITodosRepository).toClass(MockTodosRepository);
  } else {
    todosModule
      .bind(DI_SYMBOLS.ITodosRepository)
      .toClass(TodosRepository, [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.ICrashReporterService,
      ]);
  }

  //use cases
  todosModule
    .bind(DI_SYMBOLS.IGetTodosForUserUseCase)
    .toHigherOrderFunction(getTodosForUserUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ITodosRepository,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ICreateTodoUseCase)
    .toHigherOrderFunction(createTodoUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ITodosRepository,
    ]);

  //controllers
  todosModule
    .bind(DI_SYMBOLS.IGetTodosForUserController)
    .toHigherOrderFunction(getTodosForUserController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IGetTodosForUserUseCase,
    ]);

  todosModule
    .bind(DI_SYMBOLS.ICreateTodoController)
    .toHigherOrderFunction(createTodoController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ITransactionManagerService,
      DI_SYMBOLS.ICreateTodoUseCase,
    ]);

  return todosModule;
}
