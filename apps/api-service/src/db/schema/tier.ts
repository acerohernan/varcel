import { relations } from "drizzle-orm";
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { users } from "./user";
import { primaryKeys, timestamps } from "../utils";

export const tiers = pgTable(
  "tiers",
  {
    ...primaryKeys,
    ...timestamps,
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
