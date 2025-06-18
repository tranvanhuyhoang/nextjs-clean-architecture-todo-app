import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { Cookie } from "@/src/entities/models/cookie";
import { z } from "zod";

const inputSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(31),
});

export type ISignInController = ReturnType<typeof signInController>;
export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInController =
  (
    instrumentationService: IInstrumentationService,
    signInUseCase: ISignInUseCase
  ) =>
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<Cookie> => {
    return await instrumentationService.startSpan(
      { name: "signIn Controller" },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invawlid data", {
            cause: inputParseError,
          });
        }

        const { cookie } = await signInUseCase(data);
        return cookie;
      }
    );
  };
