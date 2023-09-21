import { relations } from "drizzle-orm";
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { users } from "./user";
import { primaryKeys, timestamps } from "../utils";

export const tiers = pgTable(
  "tiers",
  {
    ...primaryKeys,
    ...timestamps,
    price: integer("price").notNull(),
    name: varchar("name").notNull(),
    concurrentBuilds: integer("concurrent_builds").notNull(),
    maxNumberOfProjects: integer("max_number_of_projects").notNull(),
  },
  (table) => ({
    priceIdx: index("price_idx").on(table.price),
  })
);

export const tiersRelations = relations(tiers, ({ many }) => ({
  users: many(users),
}));
