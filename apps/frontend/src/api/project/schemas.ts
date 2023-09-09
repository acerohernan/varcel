import { z } from "zod";

export const CreateProjectShema = z
  .object({
    projectName: z.string().nonempty(),
    projectSubdomain: z.string().nonempty(),
    framework: z.string().nonempty(),

    repository: z
      .object({
        url: z.string().url(),
        name: z.string().nonempty(), // e.g. livekit
        namespace: z.string().nonempty(), // e.g. acerohernan/livekit
        branch: z.string().nonempty(),
      })
      .strict(),

    buildSettings: z
      .object({
        rootDirectory: z.string().nonempty(),
        buildCommand: z.string().nonempty(),
        outputDir: z.string().nonempty(),
        installCommand: z.string().nonempty(),
      })
      .strict(),

    env: z.array(
      z
        .object({
          key: z.string().nonempty(),
          value: z.string().nonempty(),
        })
        .strict(),
    ),
  })
  .strict();

export type ICreateProjectFormValues = z.infer<typeof CreateProjectShema>;
