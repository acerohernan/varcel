import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { BadRequestError } from "@/lib/errors";

import { CONTAINER_TYPES } from "../shared/container/types";
import { AuthService } from "./services/auth.service";
import { env } from "@/config/env";

@injectable()
export class AuthController {
  constructor(
    @inject(CONTAINER_TYPES.AuthService) private authService: AuthService
  ) {}

  async githubCallbackHandler(req: Request, res: Response) {
    const ghProfile: any = req.user;

    if (!ghProfile || !ghProfile.emails || !ghProfile.emails[0])
      throw new BadRequestError("Github sign in error");

    const { accessToken } = await this.authService.githubSignIn({
      ghId: parseInt(ghProfile.id),
      ghEmail: ghProfile.emails[0].value,
      ghUsername: ghProfile.username,
    });

    res.redirect(`${env.FRONTEND_URL}/login?token=${accessToken}`);
  }
}
