import { relations } from "drizzle-orm";
import { index, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./user";

export const tiers = pgTable(
  "tiers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    price: integer("price"),
    name: varchar("name"),
    concurrentBuilds: integer("concurrent_builds"),
    maxNumberOfProjects: integer("max_number_of_projects"),
  },
  (table) => ({
    priceIdx: index("price_idx").on(table.price),
  })
);

export const tiersRelations = relations(tiers, ({ many }) => ({
  users: many(users),
}));
