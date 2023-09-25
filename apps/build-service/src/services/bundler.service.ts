import {
  IBundlerService,
  IBundlerServiceCreateBundle,
} from "@/interfaces/services";
import { spawn } from "child_process";
import path from "path";

export class BundlerService implements IBundlerService {
  async bundle(
    params: IBundlerServiceCreateBundle
  ): Promise<{ bundlePath: string }> {
    const { rootDirectory, installCommand, buildCommand, codePath, outputDir } =
      params;

    const commands = [`cd ${rootDirectory}`, installCommand, buildCommand];

    console.log(`Creating app bundle for repo in ${codePath}`);

    await new Promise<void>((resolve, reject) => {
      const child = spawn(commands.join(" && "), {
        shell: true,
        cwd: codePath,
      });

      child.stderr.on("data", (data) => {
        console.error("STDERR:", data.toString());
      });

      child.stdout.on("data", (data) => {
        console.log("STDOUT:", data.toString());
      });

      child.on("exit", (exitCode) => {
        console.log("Child exited with code: " + exitCode);
        resolve();
      });
    });

    const bundlePath = path.resolve(codePath, rootDirectory, outputDir);

    return { bundlePath };
  }
}
