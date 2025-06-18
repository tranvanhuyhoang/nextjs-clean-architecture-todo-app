import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";

export class MockCrashReporterService implements ICrashReporterService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  report(_: unknown): string {
    return "errorId";
  }
}
