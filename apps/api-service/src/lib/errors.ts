export abstract class HttpError extends Error {
  code: number;
  errors: string[];

  constructor({
    code,
    errMessage,
    errors,
  }: {
    code: number;
    errors: string[];
    errMessage?: string;
  }) {
    super(errMessage);
    this.code = code;
    this.errors = errors;
  }
}

export class NotFoundError extends HttpError {
  constructor(errMessage: string) {
    super({ code: 404, errMessage, errors: [errMessage] });
  }
}

export class BadRequestError extends HttpError {
  constructor(errors: string[]) {
    super({ code: 400, errMessage: errors[0] ?? "BAD_REQUEST", errors });
  }
}

export class UnathorizedError extends HttpError {
  constructor(errMessage: string) {
    super({ code: 401, errMessage, errors: [errMessage] });
  }
}
