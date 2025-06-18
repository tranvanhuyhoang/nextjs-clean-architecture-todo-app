import * as Sentry from "@sentry/nextjs";

import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";

export class InstrumentationService implements IInstrumentationService {
  startSpan<T>(
    options: {
      name: string;
      op?: string;
      attributes?: Record<string, string | number | boolean | undefined>;
    },
    callback: () => T
  ): T {
    return Sentry.startSpan(options, callback);
  }

  instrumentServerAction<T>(
    name: string,
    options: Record<string, unknown>,
    callback: () => T
  ): Promise<T> {
    return Sentry.withServerActionInstrumentation(name, options, callback);
  }
}
