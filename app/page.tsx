import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SESSION_COOKIE } from "@/config";
import { getInjection } from "@/di/container";
import { cookies } from "next/headers";
import {
  UnauthenticatedError,
  AuthenticationError,
} from "@/src/entities/errors/auth";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import { CreateTodo } from "./add-todo";
import { Todos } from "./todos";
import { Todo } from "@/src/entities/models/todo";
import { UserMenu } from "@/components/ui/user-menu";

async function getTodos(sessionId: string | undefined) {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.startSpan(
    {
      name: "getTodos",
      op: "function.nextjs",
    },
    async () => {
      try {
        const getTodosForUserController = getInjection(
          "IGetTodosForUserController"
        );
        return await getTodosForUserController(sessionId);
      } catch (err) {
        if (
          err instanceof UnauthenticatedError ||
          err instanceof AuthenticationError
        ) {
          redirect("/sign-in");
        }
        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(err);
        throw err;
      }
    }
  );
}

export default async function Home() {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let todos: Todo[];
  try {
    todos = await getTodos(sessionId);
  } catch (err) {
    throw err;
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="flex-1">TODOs</CardTitle>
        <UserMenu />
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col p-6 gap-4">
        <CreateTodo />
        <Todos todos={todos} />
      </CardContent>
    </Card>
  );
}
