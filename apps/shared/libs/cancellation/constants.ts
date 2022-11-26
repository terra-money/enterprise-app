import { CancellationToken } from "./CancellationToken";
import { CancellationTokenSource } from "./CancellationTokenSource";

export const None: CancellationToken = new CancellationTokenSource();
