import { z } from "zod";

export const GithubSignInDTO = z.object({
  ghId: z.number().nonnegative(),
  ghEmail: z.string().email(),
  ghUsername: z.string().nonempty(),
});

export type TGithubSignInDTO = z.infer<typeof GithubSignInDTO>;
