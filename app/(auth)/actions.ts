"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInjection } from "@/di/container";
import { Cookie } from "@/src/entities/models/cookie";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";

export async function signIn(formData: FormData) {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "signIn",
    { recordResponse: true },
    async () => {
      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      let sessionCookie: Cookie;
      try {
        const signInController = getInjection("ISignInController");
        sessionCookie = await signInController({ username, password });
      } catch (err) {
        if (
          err instanceof InputParseError ||
          err instanceof AuthenticationError
        ) {
          return {
            error: "Incorrect username or password",
          };
        }
        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(err);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      redirect("/");
    }
  );
}
