import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";

import { BadRequestError } from "@/lib/errors";

import { User, UserGhIntegration } from "@/db/types";

import { getZodErrors } from "@v1/shared/lib/zod";
import { JWTService } from "@v1/shared/services/jwt.service";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { UserRepository } from "@v1/shared/repositories/user.repository";

import { GithubSignInDTO, TGithubSignInDTO } from "../dtos/github-signin.dto";

@injectable()
export class AuthService {
  constructor(
    @inject(CONTAINER_TYPES.JWTService) private jwtService: JWTService,
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}

  async githubSignIn(dto: TGithubSignInDTO): Promise<{ accessToken: string }> {
    const validation = GithubSignInDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { ghId, ghEmail, ghUsername } = dto;

    let user: User | undefined;

    user = await this.userRepository.getByEmail(ghEmail);

    if (!user) {
      let newUser: User = {
        id: uuid(),
        email: ghEmail,
        username: ghUsername,
        tierId: "47955fa1-02af-4dc0-b098-00404b0e52fb",
      };

      let newGhIntegration: UserGhIntegration = {
        id: uuid(),
        userId: newUser.id,
        ghUserId: ghId,
        ghInstallationId: null,
      };

      await this.userRepository.create(newUser, newGhIntegration);

      user = newUser;
    }

    const accessToken = this.jwtService.signJwtToken({ id: user.id });

    return { accessToken };
  }
}
