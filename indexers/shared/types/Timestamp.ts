export class Timestamp {
  private readonly time: number;

  constructor(time: number) {
    if (time > 2147483647) {
      // ensure that we are working in seconds, not milliseconds
      throw new Error('time out of range');
    }
    this.time = Math.trunc(time);
  }

  static from = (date: string | Date): Timestamp => {
    if (typeof date === 'string') {
      return new Timestamp(Date.parse(date) / 1000);
    }
    return new Timestamp(date.getTime() / 1000);
  };

  static now = (): Timestamp => {
    return new Timestamp(Date.now() / 1000);
  };

  toNumber = (): number => {
    return this.time;
  };

  toDate = (): Date => {
    return new Date(this.time * 1000);
  };

  toString = (): string => {
    return this.time.toString();
  };

  truncate = (type: 'month' | 'day' | 'hour' | 'minute' = 'day'): Timestamp => {
    const date = new Date(this.time * 1000);

    let time: number;

    switch (type) {
      case 'minute':
        time = Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes()
        );
        break;
      case 'hour':
        time = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours());
        break;
      case 'day':
        time = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        break;
      case 'month':
        time = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
        break;
    }

    return new Timestamp(time / 1000);
  };
}
