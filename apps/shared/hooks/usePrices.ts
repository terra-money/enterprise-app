import Big from 'big.js';
import { usePricesQuery } from '../queries';
import { useMemo } from 'react';
import { Token } from '../types';

export const usePrices = (tokens: Token[] | string[]): Record<string, Big | undefined> => {
  const { data: prices = {} } = usePricesQuery();

  return useMemo(() => {
    return tokens.reduce((previous: Token | string, current: Token | string) => {
      const key = typeof current === 'string' ? current : current.key;

      const price = prices && prices[key] ? prices[key] : undefined;

      return {
        ...(previous as Object),
        [key]: price,
      };
    }, {});
  }, [prices, tokens]);
};
