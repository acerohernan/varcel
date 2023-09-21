import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

import { db } from "@/db";
import {
  NewUser,
  NewUserGhIntegration,
  User,
  UserGhIntegration,
  users,
  userGhIntegrations,
  projectsCount,
} from "@vercelclone/core/src/db";

export interface IUserRepository {
  getById: (id: string) => Promise<User | undefined>;
  getByEmail: (email: string) => Promise<User | undefined>;
  create: (user: User, ghIntegration: UserGhIntegration) => Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async getById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async getByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async create(newUser: NewUser, newGhIntegration: NewUserGhIntegration) {
    return db.transaction(async (tx) => {
      await tx.insert(users).values(newUser);

      await Promise.all([
        tx.insert(userGhIntegrations).values(newGhIntegration),
        tx
          .insert(projectsCount)
          .values({ id: v4(), userId: newUser.id!, totalCount: 0 }),
      ]);
    });
  }
}
