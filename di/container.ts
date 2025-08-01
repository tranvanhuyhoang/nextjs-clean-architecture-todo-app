import { createContainer } from "@evyweb/ioctopus";

import { type DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";

import { createMonitoringModule } from "@/di/modules/monitoring.module";

import type { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { createAuthenticationModule } from "./modules/authentication.module";
import { createUsersModule } from "./modules/users.module";
import { createTodosModule } from "./modules/todos.module";
import { createTransactionManagerModule } from "./modules/database.module";

const ApplicationContainer = createContainer();
ApplicationContainer.load(Symbol("MonitoringModule"), createMonitoringModule());
ApplicationContainer.load(
	Symbol("AuthenticationModule"),
	createAuthenticationModule(),
);
ApplicationContainer.load(
	Symbol("TransactionManagerModule"),
	createTransactionManagerModule(),
);
ApplicationContainer.load(Symbol("UsersModule"), createUsersModule());
ApplicationContainer.load(Symbol("TodosModule"), createTodosModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
	symbol: K,
): DI_RETURN_TYPES[K] {
	const instrumentationService =
		ApplicationContainer.get<IInstrumentationService>(
			DI_SYMBOLS.IInstrumentationService,
		);

	return instrumentationService.startSpan(
		{
			name: "(di) getInjection",
			op: "function",
			attributes: { symbol: symbol.toString() },
		},
		() => ApplicationContainer.get(DI_SYMBOLS[symbol]),
	);
}
