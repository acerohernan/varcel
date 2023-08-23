import { injectable } from "inversify";

export interface IProjectRepository {}

@injectable()
export class ProjectRepository {
  constructor() {}
}
