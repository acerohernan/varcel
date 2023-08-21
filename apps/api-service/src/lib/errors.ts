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
  constructor(error: string | string[]) {
    let errorsArr: string[] = [];

    if (typeof error === "string") {
      errorsArr.push(error);
    } else {
      errorsArr = error;
    }

    super({
      code: 400,
      errMessage: errorsArr[0] ?? "BAD_REQUEST",
      errors: errorsArr,
    });
  }
}

export class UnathorizedError extends HttpError {
  constructor(errMessage: string) {
    super({ code: 401, errMessage, errors: [errMessage] });
  }
}

export class InternalServerError extends HttpError {
  constructor(errMessage: string) {
    super({ code: 500, errMessage, errors: [errMessage] });
  }
}
