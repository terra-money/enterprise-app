import { Initializer } from "initializers";
import { Runnable } from "services/runnable";
import { Logger } from "utils";

export class Runner implements Runnable {
  private readonly runnable: Runnable;
  private readonly initializers: Initializer[];
  private readonly logger: Logger;

  constructor(runnable: Runnable, ...initializers: Initializer[]) {
    this.runnable = runnable;
    this.initializers = initializers;
    this.logger = new Logger("Runner");
  }

  async run(): Promise<void> {
    for (let initializer of this.initializers) {
      await initializer.initialize();
    }

    try {
      await this.runnable.run();
    } catch (err) {
      this.logger.error(err);
    }
  }
}
