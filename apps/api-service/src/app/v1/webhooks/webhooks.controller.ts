import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { logger } from "@/config/logger";

import { BadRequestError, UnathorizedError } from "@/lib/errors";

import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { GithubWebhooksService } from "./services/gh-webhooks.service";

@injectable()
export class WebhooksController {
  private ghEventKey = "x-github-event";
  private ghSignatureKey = "x-hub-signature-256";

  constructor(
    @inject(CONTAINER_TYPES.GithubWebhookService)
    private githubWebhooksService: GithubWebhooksService
  ) {}

  async githubHandler(req: Request, res: Response) {
    console.log(req.body);

    const requestSignature = req.headers[this.ghSignatureKey];

    if (!requestSignature || typeof requestSignature !== "string")
      throw new UnathorizedError(`Invalid signature`);

    await this.githubWebhooksService.verifySignature(
      requestSignature,
      req.body
    );

    const eventType = req.headers[this.ghEventKey];

    if (!eventType)
      throw new BadRequestError(
        `Event type header not found in github webhook notification!`
      );

    logger.info(`Github webhook event received: ${eventType}`);

    switch (eventType) {
      case "push": {
        await this.githubWebhooksService.pushEventHandler(req.body);

        break;
      }

      default:
        break;
    }

    res.sendStatus(200);
  }
}
