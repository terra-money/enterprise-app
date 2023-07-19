import { useLcdClient } from '@terra-money/wallet-kit';
import { useCallback } from 'react';

export type QueryContract = <QueryMsg extends {}, QueryResponse>(
  contractAddress: string,
  message: QueryMsg
) => Promise<QueryResponse>;

export const useContract = () => {
  const lcd = useLcdClient();

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
