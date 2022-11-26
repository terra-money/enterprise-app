export type Frequency = "monthly" | "daily" | "hourly";

export const truncate = (
  date: Date,
  frequency: Frequency = "daily"
): number => {
  switch (frequency) {
    case "hourly":
      return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours()
      );
    case "daily":
      return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      );
    case "monthly":
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
  }
};

export const truncateTimestamp = (
  timestamp: number,
  frequency: Frequency = "daily"
): number => {
  return Math.trunc(truncate(new Date(timestamp * 1000), frequency) / 1000);
};
