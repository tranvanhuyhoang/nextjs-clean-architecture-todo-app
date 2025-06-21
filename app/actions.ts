"use server";

import { SESSION_COOKIE } from "@/config";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createTodo(formData: FormData) {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "createTodo",
    { recordResponse: true },
    async () => {
      try {
        const data = Object.fromEntries(formData.entries());
        const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
        const createTodoController = getInjection("ICreateTodoController");
        await createTodoController(data, sessionId);
      } catch (err) {
        if (err instanceof InputParseError) {
          return { error: err.message };
        }
        if (err instanceof UnauthenticatedError) {
          return { error: "Must be logged in to create a todo" };
        }
        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(err);
        return {
          error:
            "An error happened while creating a todo. The developers have been notified. Please try again later.",
        };
      }

      revalidatePath("/");
      return { success: true };
    }
  );
}
