import { useLCDClient } from '@terra-money/wallet-provider';
import { useCallback } from 'react';
import { reportError } from 'errors/errorMonitoring';

export const useContract = () => {
  const lcd = useLCDClient();

  const query = useCallback(
    async <QueryMsg extends {}, QueryResponse>(contractAddress: string, message: QueryMsg): Promise<QueryResponse> => {
      try {
        return await lcd.wasm.contractQuery<QueryResponse>(contractAddress, message);
      } catch (err) {
        reportError(err, { contractAddress, message: JSON.stringify(message) });
        throw err;
      }
    },
    [lcd.wasm]
  );

  return {
    query,
  };
};
