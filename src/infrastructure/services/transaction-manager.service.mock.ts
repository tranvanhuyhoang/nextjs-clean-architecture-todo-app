import type { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";
import type { ITransaction } from "@/src/entities/models/transaction.interface";

export class MockTransactionManagerService
  implements ITransactionManagerService
{
  public startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>,
  ): Promise<T> {
    return clb({ rollback: () => {} });
  }
}
