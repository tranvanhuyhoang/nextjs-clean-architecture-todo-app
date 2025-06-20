import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { IGetTodosForUserUseCase } from "@/src/application/use-cases/todos/get-todos-for-user.use-case";
import {
  ISignInController,
  ISignInUseCase,
} from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { ISignUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { IGetTodosForUserController } from "@/src/interface-adapters/controllers/todos/get-todos-for-user.controller";

export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for("IInstrumentationService"),
  ICrashReporterService: Symbol.for("ICrashReporterService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),

  // Repositories
  ITodosRepository: Symbol.for("ITodosRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),

  // Use Cases
  ISignInUseCase: Symbol.for("ISignInUseCase"),
  ISignUpUseCase: Symbol.for("ISignUpUseCase"),
  IGetTodosForUserUseCase: Symbol.for("IGetTodosForUserUseCase"),

  // Controllers
  ISignInController: Symbol.for("ISignInController"),
  ISignUpController: Symbol.for("ISignUpController"),
  IGetTodosForUserController: Symbol.for("IGetTodosForUserController"),
};

export interface DI_RETURN_TYPES {
  //Service
  IInstrumentationService: IInstrumentationService;
  ICrashReporterService: ICrashReporterService;
  IAuthenticationService: IAuthenticationService;

  // Repositories
  ITodosRepository: ITodosRepository;
  IUsersRepository: IUsersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  ISignUpUseCase: ISignUpUseCase;
  IGetTodosForUserUseCase: IGetTodosForUserUseCase;

  // Controllers
  ISignInController: ISignInController;
  ISignUpController: ISignUpController;
  IGetTodosForUserController: IGetTodosForUserController;
}
