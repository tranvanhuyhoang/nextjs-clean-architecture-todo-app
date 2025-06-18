import { ITransaction } from "@/src/entities/models/transaction.interface";
import { User, CreateUser } from "@/src/entities/models/user";

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(input: CreateUser, tx?: ITransaction): Promise<User>;
}
