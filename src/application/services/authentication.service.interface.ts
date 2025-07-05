import type { Cookie } from "@/src/entities/models/cookie";
import type { User } from "@/src/entities/models/user";
import type { Session } from "@/src/entities/models/session";

export interface IAuthenticationService {
  generateUserId(): string;
  validateSession(
    sessionId: Session["id"],
  ): Promise<{ user: User; session: Session }>;
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string,
  ): Promise<boolean>;
  createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
}
