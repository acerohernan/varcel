import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { inject, injectable } from "inversify";
import { ProjectRepository } from "../repositories/project.repository";
import {
  CreateProjectDTO,
  TCreateProjectDTO,
} from "../dtos/create-project.dto";
import { BadRequestError } from "@/lib/errors";
import { getZodErrors } from "@v1/shared/lib/zod";

@injectable()
export class ProjectService {
  constructor(
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository
  ) {}

  async create(dto: TCreateProjectDTO): Promise<void> {
    const validation = CreateProjectDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    // Bussiness logic
  }
}
