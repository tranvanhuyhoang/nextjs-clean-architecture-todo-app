import type { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import type { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import type { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import type { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import type { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";
import type { ISignOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import type { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import type { ICreateTodoUseCase } from "@/src/application/use-cases/todos/create-todo.use-case";
import type { IDeleteTodoUseCase } from "@/src/application/use-cases/todos/delete-todo.use-case";
import type { IGetTodosForUserUseCase } from "@/src/application/use-cases/todos/get-todos-for-user.use-case";
import type { IToggleTodoUseCase } from "@/src/application/use-cases/todos/toggle-todo.use-case";
import type {
	ISignInController,
	ISignInUseCase,
} from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import type { ISignOutController } from "@/src/interface-adapters/controllers/auth/sign-out.controller";
import type { ISignUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import type { IBulkUpdateController } from "@/src/interface-adapters/controllers/todos/bulk-update.controller";
import type { ICreateTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import type { IGetTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-todos-for-user.controller";
import type { IToggleTodoController } from "@/src/interface-adapters/controllers/todos/toggle-todo.controller";

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
	ISignOutUseCase: Symbol.for("ISignOutUseCase"),

	// Controllers
	ISignInController: Symbol.for("ISignInController"),
	ISignUpController: Symbol.for("ISignUpController"),
	IGetTodosForUserController: Symbol.for("IGetTodosForUserController"),
	ICreateTodoController: Symbol.for("ICreateTodoController"),
	IToggleTodoController: Symbol.for("IToggleTodoController"),
	IBulkUpdateController: Symbol.for("IBulkUpdateController"),
	ISignOutController: Symbol.for("ISignOutController"),
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
	ISignOutUseCase: ISignOutUseCase;
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
	ISignOutController: ISignOutController;
}
