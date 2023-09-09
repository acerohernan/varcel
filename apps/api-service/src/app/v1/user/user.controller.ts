import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { env } from "@/config/env";

import { BadRequestError, UnathorizedError } from "@/lib/errors";

import { JWTUser } from "@v1/shared/middlewares/verifyJwt";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { IPaginatedMetadata } from "@v1/shared/lib/response";

import { UserService } from "./services/user.service";

@injectable()
export class UserController {
  constructor(
    @inject(CONTAINER_TYPES.UserService) private userService: UserService
  ) {}

  async getUserHandler(req: Request, res: Response) {
    const jwtUser: JWTUser = res.locals.user;

    if (!jwtUser) throw new UnathorizedError("Invalid JWT");

    const user = await this.userService.getInformation({ userId: jwtUser.id });

    res.send({ user });
  }

  async setupGithubIntegrationHandler(req: Request, res: Response) {
    const installationId = parseInt(req.query.installation_id as string);
    const code = req.query.code as string;

    await this.userService.setupGithubIntegration({ code, installationId });

    res.redirect(`${env.FRONTEND_URL}/new`);
  }

  async getRepositoriesHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Invalid JWT");

    const page = Number(req.query.page) > 1 ? Number(req.query.page) : 1;

    // Allow only query 5 repositories at time
    const perPage = 5;

    const { repositories, totalCount } = await this.userService.getRepositories(
      { userId: user.id, page, perPage }
    );

    const lastPage = Math.trunc(totalCount / perPage) + 1;

    const metadata: IPaginatedMetadata = {
      page,
      totalCount,
      lastPage,
      isLastPage: lastPage === page,
      nextPageExists: page < lastPage,
    };

    res.send({
      repositories,
      metadata,
    });
  }

  async getRepositoryHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Invalid JWT");

    const repoUrl = req.query.url;

    if (!repoUrl || typeof repoUrl !== "string")
      throw new BadRequestError(`The query parameter repository is required`);

    const [repoName, repoOwner] = repoUrl.split("/").reverse();

    const repository = await this.userService.getRepository({
      userId: user.id,
      repoName,
      repoOwner,
    });

    res.send({ repository });
  }
}
