import { useQueryClient } from 'react-query';
import { TX_KEY } from 'tx';
import { QUERY_KEY } from './queryKey';
import { sleep } from 'chain/transactions/utils/sleep';
import { useRefCallback } from 'chain/transactions/utils/useRefCallback';

interface QueryRefetch {
  queryKey: QUERY_KEY;
  wait?: number;
}

type QueryRefetchMap = Record<TX_KEY, (QUERY_KEY | QueryRefetch)[]>;

// TODO: check refetch for create and cancel (probably off)
const QUERY_REFETCH_MAP: QueryRefetchMap = {
  [TX_KEY.CREATE_DAO]: [QUERY_KEY.DAOS, QUERY_KEY.RECENT_DAOS],
  [TX_KEY.DEPOSIT]: [QUERY_KEY.DAO_ASSETS],
  [TX_KEY.DEPOSIT_INTO_FUNDS_DISTRIBUTOR]: [QUERY_KEY.MY_DAO_REWARDS],
  [TX_KEY.STAKE_TOKEN]: [
    QUERY_KEY.CW20_TOKEN_BALANCE,
    QUERY_KEY.TOKEN_STAKING_AMOUNT,
    QUERY_KEY.VOTING_POWER,
    QUERY_KEY.RELEASABLE_CLAIMS,
    QUERY_KEY.CLAIMS,
    QUERY_KEY.NATIVE_BALANCE,
  ],
  [TX_KEY.UNSTAKE_TOKEN]: [
    QUERY_KEY.CW20_TOKEN_BALANCE,
    QUERY_KEY.TOKEN_STAKING_AMOUNT,
    QUERY_KEY.VOTING_POWER,
    QUERY_KEY.RELEASABLE_CLAIMS,
    QUERY_KEY.CLAIMS,
    QUERY_KEY.NATIVE_BALANCE,
  ],
  [TX_KEY.STAKE_NFT]: [
    QUERY_KEY.CW721_TOKENS,
    QUERY_KEY.NFT_STAKING_AMOUNT,
    QUERY_KEY.NFT_STAKING,
    QUERY_KEY.VOTING_POWER,
    QUERY_KEY.RELEASABLE_CLAIMS,
    QUERY_KEY.CLAIMS,
    QUERY_KEY.NATIVE_BALANCE,
  ],
  [TX_KEY.UNSTAKE_NFT]: [
    QUERY_KEY.CW721_TOKENS,
    QUERY_KEY.NFT_STAKING_AMOUNT,
    QUERY_KEY.NFT_STAKING,
    QUERY_KEY.VOTING_POWER,
    QUERY_KEY.RELEASABLE_CLAIMS,
    QUERY_KEY.CLAIMS,
    QUERY_KEY.NATIVE_BALANCE,
  ],
  [TX_KEY.CLAIM]: [
    QUERY_KEY.CW20_TOKEN_BALANCE,
    QUERY_KEY.TOKEN_STAKING_AMOUNT,
    QUERY_KEY.VOTING_POWER,
    QUERY_KEY.RELEASABLE_CLAIMS,
    QUERY_KEY.CLAIMS,
    QUERY_KEY.NATIVE_BALANCE,
  ],
  [TX_KEY.CREATE_PROPOSAL]: [QUERY_KEY.PROPOSALS, QUERY_KEY.RECENT_PROPOSALS, QUERY_KEY.NATIVE_BALANCE],
  [TX_KEY.EXECUTE_PROPOSAL]: [QUERY_KEY.PROPOSALS, QUERY_KEY.PROPOSAL, QUERY_KEY.NATIVE_BALANCE],
  [TX_KEY.CAST_VOTE]: [QUERY_KEY.PROPOSALS, QUERY_KEY.PROPOSAL, QUERY_KEY.PROPOSAL_VOTES, QUERY_KEY.NATIVE_BALANCE],
  [TX_KEY.CLAIM_REWARDS]: [QUERY_KEY.CW20_TOKEN_BALANCE, QUERY_KEY.NATIVE_BALANCE, QUERY_KEY.MY_DAO_REWARDS],
};

const runRefetch = (queryRefetch: string | QueryRefetch): Promise<string> => {
  return new Promise<string>((resolve) => {
    if (typeof queryRefetch === 'string') {
      // we cant query right away because we need to give the nodes
      // time to sync before the data is available to requery
      sleep(300).then(() => resolve(queryRefetch));
    } else if (typeof queryRefetch.wait === 'number') {
      sleep(queryRefetch.wait).then(() => resolve(queryRefetch.queryKey));
    } else {
      resolve(queryRefetch.queryKey);
    }
  });
};

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  return useRefCallback(
    (txKey: TX_KEY) => {
      if (QUERY_REFETCH_MAP[txKey]) {
        for (const queryRefetch of QUERY_REFETCH_MAP[txKey]) {
          runRefetch(queryRefetch).then((queryKey) => {
            queryClient.invalidateQueries(queryKey, {
              refetchActive: true,
              refetchInactive: false,
            });
          });
        }
      }
    },
    [queryClient]
  );
};
