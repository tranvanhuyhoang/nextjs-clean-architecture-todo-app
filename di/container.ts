import { createContainer } from "@evyweb/ioctopus";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";

import { createMonitoringModule } from "@/di/modules/monitoring.module";

import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { createAuthenticationModule } from "./modules/authentication.module";
import { createUsersModule } from "./modules/users.module";

const ApplicationContainer = createContainer();
ApplicationContainer.load(Symbol("MonitoringModule"), createMonitoringModule());
ApplicationContainer.load(
  Symbol("AuthenticationModule"),
  createAuthenticationModule()
);
ApplicationContainer.load(Symbol("UsersModule"), createUsersModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService
    );

  return instrumentationService.startSpan(
    {
      name: "(di) getInjection",
      op: "function",
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get(DI_SYMBOLS[symbol])
  );
}
