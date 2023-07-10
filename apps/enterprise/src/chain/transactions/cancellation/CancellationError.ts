export class CancellationError extends Error {
  public readonly name = "CancellationError";
  public readonly message = "The operation was cancelled";
}
