import { eq } from "drizzle-orm";
import { injectable } from "inversify";

import { db } from "@/db";
import { User, UserGhIntegration } from "@/db/types";
import { userGhIntegrations, users } from "@/db/schema/user";

export interface IUserRepository {
  getByEmail: (email: string) => Promise<User | undefined>;
  create: (user: User, ghIntegration: UserGhIntegration) => Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async getByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async create(newUser: User, newGhIntegration: UserGhIntegration) {
    return db.transaction(async (tx) => {
      await tx.insert(users).values(newUser);
      await tx.insert(userGhIntegrations).values(newGhIntegration);
    });
  }
}
