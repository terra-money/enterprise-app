import { useCW20TokenInfoQuery, useTokenStakingAmountQuery } from 'queries';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import Big from 'big.js';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { toPercents } from 'lib/shared/utils/toPercents';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

export const TokenDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();

  const { data: token, status: tokenStatus } = useCW20TokenInfoQuery(dao_membership_contract);

  const { data: totalStaked, status } = useTokenStakingAmountQuery(address);

  return (
    <Panel>
      <TitledSection title="Total staked">
        <QueryDependant
          data={totalStaked}
          status={status}
          loading={() => <Spinner />}
          error={() => <Text>Failed to load</Text>}
          success={(totalStaked) => (
            <NumericStatistic
              value={fromChainAmount(totalStaked.toString(), token?.decimals ?? 6)}
              suffix={
                <QueryDependant
                  data={token}
                  status={tokenStatus}
                  loading={() => <Spinner />}
                  error={() => null}
                  success={(token) => {
                    const totalStakedPercent = Big(token.total_supply ?? 0).eq(0)
                      ? 0
                      : totalStaked.div(token.total_supply ?? 0).toNumber();

                    return toPercents(totalStakedPercent, 'round');
                  }}
                />
              }
            />
          )}
        />
      </TitledSection>
    </Panel>
  );
};
