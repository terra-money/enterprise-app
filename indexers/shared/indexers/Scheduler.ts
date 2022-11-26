import { Runnable } from "services/runnable";
import { Logger, sleep } from "utils";

export class Scheduler implements Runnable {
  private readonly runnable: Runnable;
  private readonly interval: number;
  private readonly logger: Logger;

  constructor(runnable: Runnable, interval: number) {
    this.runnable = runnable;
    this.interval = interval;
    this.logger = new Logger("Scheduler");
  }

  static wrap(runnable: Runnable, envVarName: string = "INTERVAL"): Runnable {
    if (process.env[envVarName]) {
      return new Scheduler(runnable, +process.env[envVarName] * 1000);
    }
    return runnable;
  }

  async run(): Promise<void> {
    while (true) {
      try {
        await this.runnable.run();
        await sleep(this.interval);
      } catch (err) {
        this.logger.error(err);
        await sleep(5000);
      }
    }
  }
}
