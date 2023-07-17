import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useMyDaoRewardsQuery } from 'dao/hooks/useMyDaoRewardsQuery';
import { useClaimRewardsTx } from 'dao/tx/useClaimRewardsTx';
import { Button } from 'lib/ui/buttons/Button';
import { TitledContent } from 'lib/ui/Layout/TitledContent';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useMemo } from 'react';
import { RewardItem } from './RewardItem';
import { InfoIcon } from 'lib/ui/icons/InfoIcon';
import { useCurrentDaoAssetWhitelistQuery } from 'queries/useCurrentDaoAssetWhitelistQuery';
import { splitBy } from 'lib/shared/utils/splitBy';

export const RewardsPanel = () => {
  const { funds_distributor_contract, dao_type, dao_membership_contract } = useCurrentDao();
  const { data: whitelist } = useCurrentDaoAssetWhitelistQuery();

  const tokensToCheck = useMemo(() => {
    if (!whitelist) return;

    const result = {
      native: new Set<string>(whitelist.filter((asset) => asset.type === 'native').map((asset) => asset.id)),
      cw20: new Set<string>(whitelist.filter((asset) => asset.type === 'cw20').map((asset) => asset.id)),
    };

    if (dao_type === 'token') {
      result.cw20.add(dao_membership_contract);
    }

    return result;
  }, [dao_membership_contract, dao_type, whitelist]);

  const { data: rewards, isLoading: areRewardsLoading } = useMyDaoRewardsQuery(
    tokensToCheck
      ? {
          fundsDistributorAddress: funds_distributor_contract,
          nativeDenoms: Array.from(tokensToCheck.native),
          cw20Assets: Array.from(tokensToCheck.cw20),
        }
      : undefined
  );

  const areRewardsAvailable = rewards && rewards.length > 0;

  const [txResult, claimRewards] = useClaimRewardsTx();

  const areNoRewards = !areRewardsLoading && !areRewardsAvailable;

  return (
    <Panel>
      <TitledContent title="Rewards">
        <HStack alignItems="center" gap={8}>
          <Text color="supporting">
            <InfoIcon />
          </Text>
          <Text color="supporting">Only whitelisted tokens are displayed.</Text>
        </HStack>
        <VStack fullHeight gap={40} justifyContent="space-between">
          {areNoRewards ? (
            <Text>Nothing to claim</Text>
          ) : (
            <>
              <VStack gap={12}>
                {rewards?.map((reward, index) => (
                  <RewardItem key={index} {...reward} />
                ))}
              </VStack>
              <Button
                kind="secondary"
                isDisabled={areNoRewards && 'No tokens to claim'}
                isLoading={txResult.loading}
                onClick={() => {
                  const [cw20, native] = splitBy(assertDefined(rewards), (reward) => (reward.type === 'cw20' ? 0 : 1));
                  claimRewards({
                    fundsDistributorAddress: funds_distributor_contract,
                    cw20Assets: cw20.map((reward) => reward.id),
                    nativeDenoms: native.map((reward) => reward.id),
                  });
                }}
              >
                Claim all
              </Button>
            </>
          )}
        </VStack>
      </TitledContent>
    </Panel>
  );
};
