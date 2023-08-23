import { z } from "zod";

export const CreateProjectDTO = z.object({
  projectName: z.string().nonempty(),
  framework: z.string().nonempty(),
  rootDirectory: z.string().nonempty(),

  repository: z.object({
    url: z.string().url(),
    name: z.string().nonempty(), // e.g. livekit
    namespace: z.string().nonempty(), // e.g. acerohernan/livekit
    branch: z.string().nonempty(),
  }),

  buildSettings: z.object({
    buildCommand: z.string().nonempty(),
    outputDir: z.string().nonempty(),
    installCommand: z.string().nonempty(),
  }),

  env: z.array(
    z.object({
      key: z.string().nonempty(),
      value: z.string().nonempty(),
    })
  ),
});

export type TCreateProjectDTO = z.infer<typeof CreateProjectDTO>;
