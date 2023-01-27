import { CW20Addr } from '@terra-money/apps/types';
import { useQuery, UseQueryResult } from 'react-query';
import { DAO } from 'types';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import Big from 'big.js';

type DaoQueryArguments = Extract<enterprise.QueryMsg, { dao_info: {} }>;

export const useDAOQuery = (address: CW20Addr): UseQueryResult<DAO | undefined> => {
  const { query } = useContract();

  return useQuery(
    [QUERY_KEY.DAO, address],
    async () => {
      let response = await query<DaoQueryArguments, enterprise.DaoInfoResponse>(address, {
        dao_info: {},
      });

      return new DAO(
        address,
        response.dao_type,
        response.metadata.name,
        response.metadata.description || undefined,
        response.metadata.logo === 'none' ? undefined : response.metadata.logo.url,
        response.dao_membership_contract,
        response.enterprise_factory_contract,
        {
          discord_username: response.metadata.socials.discord_username || undefined,
          github_username: response.metadata.socials.github_username || undefined,
          telegram_username: response.metadata.socials.telegram_username || undefined,
          twitter_username: response.metadata.socials.twitter_username || undefined,
        },
        {
          quorum: Big(response.gov_config.quorum).toNumber(),
          threshold: Big(response.gov_config.threshold).toNumber(),
          vetoThreshold: Big(response.gov_config.veto_threshold ?? response.gov_config.threshold).toNumber(),
          unlockingPeriod: response.gov_config.unlocking_period,
          voteDuration: response.gov_config.vote_duration,
          minimumDeposit: response.gov_config.minimum_deposit || undefined,
          allowEarlyProposalExecution: response.gov_config.allow_early_proposal_execution || false,
        },
        response.dao_council || undefined
      );
    },
    {
      refetchOnMount: false,
    }
  );
};
