import { CancellationSubscriber, Unsubscribe } from "./types";

export interface CancellationToken {
  subscribe(subscriber: CancellationSubscriber): Unsubscribe;
  cancelled(): boolean;
}
