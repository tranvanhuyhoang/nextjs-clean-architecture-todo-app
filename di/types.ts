import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";
import { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { ICreateTodoUseCase } from "@/src/application/use-cases/todos/create-todo.use-case";
import { IDeleteTodoUseCase } from "@/src/application/use-cases/todos/delete-todo.use-case";
import { IGetTodosForUserUseCase } from "@/src/application/use-cases/todos/get-todos-for-user.use-case";
import { IToggleTodoUseCase } from "@/src/application/use-cases/todos/toggle-todo.use-case";
import {
  ISignInController,
  ISignInUseCase,
} from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { ISignUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { IBulkUpdateController } from "@/src/interface-adapters/controllers/todos/bulk-update.controller";
import { ICreateTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import { IGetTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-todos-for-user.controller";
import { IToggleTodoController } from "@/src/interface-adapters/controllers/todos/toggle-todo.controller";

export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for("IInstrumentationService"),
  ICrashReporterService: Symbol.for("ICrashReporterService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITransactionManagerService: Symbol.for("ITransactionManagerService"),

  // Repositories
  ITodosRepository: Symbol.for("ITodosRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),

  // Use Cases
  ISignInUseCase: Symbol.for("ISignInUseCase"),
  ISignUpUseCase: Symbol.for("ISignUpUseCase"),
  IGetTodosForUserUseCase: Symbol.for("IGetTodosForUserUseCase"),
  ICreateTodoUseCase: Symbol.for("ICreateTodoUseCase"),
  IToggleTodoUseCase: Symbol.for("IToggleTodoUseCase"),
  IDeleteTodoUseCase: Symbol.for("IDeleteTodoUseCase"),

  // Controllers
  ISignInController: Symbol.for("ISignInController"),
  ISignUpController: Symbol.for("ISignUpController"),
  IGetTodosForUserController: Symbol.for("IGetTodosForUserController"),
  ICreateTodoController: Symbol.for("ICreateTodoController"),
  IToggleTodoController: Symbol.for("IToggleTodoController"),
  IBulkUpdateController: Symbol.for("IBulkUpdateController"),
};

export interface DI_RETURN_TYPES {
  //Service
  IInstrumentationService: IInstrumentationService;
  ICrashReporterService: ICrashReporterService;
  IAuthenticationService: IAuthenticationService;
  ITransactionManagerService: ITransactionManagerService;

  // Repositories
  ITodosRepository: ITodosRepository;
  IUsersRepository: IUsersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  ISignUpUseCase: ISignUpUseCase;
  IGetTodosForUserUseCase: IGetTodosForUserUseCase;
  ICreateTodoUseCase: ICreateTodoUseCase;
  IToggleTodoUseCase: IToggleTodoUseCase;
  IDeleteTodoUseCase: IDeleteTodoUseCase;

  // Controllers
  ISignInController: ISignInController;
  ISignUpController: ISignUpController;
  IGetTodosForUserController: IGetTodosForUserController;
  ICreateTodoController: ICreateTodoController;
  IToggleTodoController: IToggleTodoController;
  IBulkUpdateController: IBulkUpdateController;
}
