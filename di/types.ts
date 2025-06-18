import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import {
  ISignInController,
  ISignInUseCase,
} from "@/src/interface-adapters/controllers/auth/sign-in.controller";

export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for("IInstrumentationService"),
  ICrashReporterService: Symbol.for("ICrashReporterService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),

  // Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),

  // Use Cases
  ISignInUseCase: Symbol.for("ISignInUseCase"),

  // Controllers
  ISignInController: Symbol.for("ISignInController"),
};

export interface DI_RETURN_TYPES {
  //Service
  IInstrumentationService: IInstrumentationService;
  ICrashReporterService: ICrashReporterService;
  IAuthenticationService: IAuthenticationService;

  // Repositories
  IUsersRepository: IUsersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;

  // Controllers
  ISignInController: ISignInController;
}
