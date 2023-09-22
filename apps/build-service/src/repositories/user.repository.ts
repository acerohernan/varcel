import { eq } from "drizzle-orm";
import {
  User,
  UserGhIntegration,
  userGhIntegrations,
  users,
} from "@vercelclone/core/src/db";

import { db } from "@/db";
import { IUserRepository } from "@/interfaces/repositories";

export class UserRepository implements IUserRepository {
  async getById(userId: string): Promise<User | undefined> {
    return db.query.users.findFirst({ where: eq(users.id, userId) });
  }
  async getGhIntegration(
    userId: string
  ): Promise<UserGhIntegration | undefined> {
    return db.query.userGhIntegrations.findFirst({
      where: eq(userGhIntegrations.userId, userId),
    });
  }
}
