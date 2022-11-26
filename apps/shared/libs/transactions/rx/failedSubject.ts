import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { FailedTransaction } from "../types";

const DEFAULT = {} as FailedTransaction;

export const failedSubject = new BehaviorSubject<FailedTransaction>(
  DEFAULT
).pipe(skip(1)) as BehaviorSubject<FailedTransaction>;
