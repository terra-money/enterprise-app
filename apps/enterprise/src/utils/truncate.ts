export type Frequency = 'week' | 'day' | 'hour' | 'minute';

export const truncate = (date: Date, frequency: Frequency = 'day'): number => {
  switch (frequency) {
    case 'minute':
      return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes()
      );
    case 'hour':
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours());
    case 'day':
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    case 'week':
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - date.getUTCDay() * 86400000;
  }
};
