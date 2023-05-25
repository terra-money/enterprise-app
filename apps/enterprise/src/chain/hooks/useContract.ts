import { useLCDClient } from '@terra-money/wallet-provider';
import { useCallback } from 'react';

export const useContract = () => {
  const lcd = useLCDClient();

  const query = useCallback(
    async <QueryMsg extends {}, QueryResponse>(contractAddress: string, message: QueryMsg): Promise<QueryResponse> => {
      return lcd.wasm.contractQuery<QueryResponse>(contractAddress, message);
    },
    [lcd.wasm]
  );

  return {
    query,
  };
};
