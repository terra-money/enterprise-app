import pino, { Logger as PinoLogger } from "pino";

export class Logger {
  private readonly namespace: string;
  private readonly logger: PinoLogger;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.logger = pino();
  }

  info = (message: string, data: Record<string, unknown> = {}) => {
    return this.logger.info(data, `[${this.namespace}] ${message}`);
  };

  warn = (message: string, data: Record<string, unknown> = {}) => {
    return this.logger.warn(data, `[${this.namespace}] ${message}`);
  };

  error = (message: string, data: Record<string, unknown> = {}) => {
    return this.logger.error(data, `[${this.namespace}] ${message}`);
  };
}
