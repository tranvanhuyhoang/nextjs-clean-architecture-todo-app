import type { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";

import { Todo } from "@/src/entities/models/todo";
import { ITodosRepository } from "../../repositories/todos.repository.interface";

export type IGetTodosForUserUseCase = ReturnType<typeof getTodosForUserUseCase>;

export const getTodosForUserUseCase =
  (
    instrumentationService: IInstrumentationService,
    todosRepository: ITodosRepository
  ) =>
  (userId: string): Promise<Todo[]> => {
    return instrumentationService.startSpan(
      { name: "getTodosForUser UseCase", op: "function" },
      async () => {
        return await todosRepository.getTodosForUser(userId);
      }
    );
  };
