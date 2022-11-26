import { format, formatDistance, compareAsc } from 'date-fns';

export const getExpirationMessage = (expirationDate: Date) => {
  const dateNow = new Date();
  if (compareAsc(expirationDate, dateNow) > 0) {
    return `Voting ends ${formatDistance(expirationDate, dateNow, { addSuffix: true })}`;
  }

  return `Voting ended on ${format(expirationDate, 'dd MMM yyyy HH:mm:ss z')}`;
};
