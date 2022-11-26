import { secondsInDay, secondsInMinute } from 'date-fns';

export type TimeConverter = (value: number) => number;

export const daysConverter = (value: number) => {
  return value * secondsInDay;
};

export const minutesConverter = (value: number) => {
  return value * secondsInMinute;
};
