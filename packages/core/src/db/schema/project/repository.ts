import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar, index } from "drizzle-orm/pg-core";

import { primaryKeys } from "../../utils";

import { projects } from "./index";

export const projectRepositories = pgTable(
  "project_repositories",
  {
    ...primaryKeys,
    projectId: uuid("project_id").unique().notNull(),
    url: varchar("url").notNull(),
    name: varchar("name").notNull(),
    owner: varchar("owner").notNull(),
    namespace: varchar("namespace").notNull(), // @deprecated
    branch: varchar("branch").notNull(), // @deprecated
  },
  (table) => ({
    nameAndOwnerIdx: index("name_and_owner_idx").on(table.name, table.owner),
  })
);

export const projectRepositoriesRelations = relations(
  projectRepositories,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectRepositories.projectId],
      references: [projects.id],
    }),
  })
);
