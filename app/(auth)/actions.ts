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

export async function signUp(formData: FormData) {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "signUp",
    { recordResponse: true },
    async () => {
      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();
      const confirmPassword = formData.get("confirm_password")?.toString();

      let sessionCookie: Cookie;
      try {
        const signUpController = getInjection("ISignUpController");
        const { cookie } = await signUpController({
          username,
          password,
          confirm_password: confirmPassword,
        });
        sessionCookie = cookie;
      } catch (err) {
        if (err instanceof InputParseError) {
          return {
            error:
              "Invalid data. Make sure the Password and Confirm Password match.",
          };
        }
        if (err instanceof AuthenticationError) {
          return {
            error: err.message,
          };
        }
        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(err);

        return {
          error:
            "An error happened. The developers have been notified. Please try again later. Message: " +
            (err as Error).message,
        };
      }

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      redirect("/");
    }
  );
}
