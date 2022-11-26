export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
  }

  static badRequest(message: string = undefined): HttpError {
    return new HttpError(
      400,
      message ? `Bad Request: ${message}` : "Bad Request"
    );
  }

  static notFound(message: string = undefined): HttpError {
    return new HttpError(404, message ? `Not Found: ${message}` : "Not Found");
  }
}
