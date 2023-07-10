import { CancellationError } from "./CancellationError";
import { CancellationToken } from "./CancellationToken";
import { CancellationSubscriber } from "./types";

export class CancellationTokenSource implements CancellationToken {
  private _cancellation: Error | undefined;
  private _subscribers: CancellationSubscriber[] = [];

  public subscribe(subscriber: CancellationSubscriber) {
    if (this._cancellation) {
      subscriber(this._cancellation);
    } else {
      this._subscribers.push(subscriber);
    }

    return () => {
      this._subscribers = this._subscribers.filter((s) => s !== subscriber);
    };
  }

  public cancel(err: Error = new CancellationError()) {
    this._cancellation = err;
    this._subscribers.splice(0).forEach((subscriber) => subscriber(err));
  }

  public cancelled(): boolean {
    return Boolean(this._cancellation);
  }
}
