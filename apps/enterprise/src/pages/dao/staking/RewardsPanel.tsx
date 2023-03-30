import { assertDefined } from "@terra-money/apps/utils";
import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useMyDaoRewardsQuery } from "dao/hooks/useMyDaoRewardsQuery";
import { useClaimRewardsTx } from "dao/tx/useClaimRewardsTx";
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton";
import { TitledContent } from "lib/ui/Layout/TitledContent";
import { Panel } from "lib/ui/Panel/Panel";
import { VStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import { useDAOAssetsWhitelist, useGlobalAssetsWhitelist } from "queries";
import { useMemo } from "react";
import { RewardItem } from "./RewardItem";

export const RewardsPanel = () => {
  const { fundsDistributorContract, address, type, membershipContractAddress } = useCurrentDao()
  const { data: globalWhitelist } = useGlobalAssetsWhitelist()
  const { data: daoWhitelist } = useDAOAssetsWhitelist(address)

  const tokensToCheck = useMemo(() => {
    if (!daoWhitelist || !globalWhitelist) return

    const result = {
      native: new Set<string>(),
      cw20: new Set<string>(),
    }

    const whitelist = [...globalWhitelist, ...daoWhitelist]

    whitelist.forEach((asset) => {
      if ('native' in asset) {
        result.native.add(asset.native)
      } else if ('cw20' in asset) {
        result.cw20.add(asset.cw20)
      }
    })

    if (type === 'token') {
      result.cw20.add(membershipContractAddress)
    }

    return result
  }, [daoWhitelist, globalWhitelist, membershipContractAddress, type])

  const { data: rewards, isLoading: areRewardsLoading } = useMyDaoRewardsQuery(tokensToCheck ? {
    fundsDistributorAddress: fundsDistributorContract,
    nativeDenoms: Array.from(tokensToCheck.native),
    cw20Assets: Array.from(tokensToCheck.cw20),
  } : undefined)

  const areRewardsAvailable = rewards && rewards.length > 0

  const [txResult, claimRewards] = useClaimRewardsTx()

  const areNoRewards = !areRewardsLoading && !areRewardsAvailable

  return (
    <Panel>
      <TitledContent title="Rewards">
        <VStack fullHeight gap={40} justifyContent="space-between">
          {areNoRewards ? <Text>Nothing to claim</Text> : (
            <>
              <VStack gap={12}>
                {rewards?.map((reward, index) => <RewardItem key={index} {...reward} />)}
              </VStack>
              <PrimaryButton
                kind="secondary"
                isDisabled={!areRewardsAvailable}
                isLoading={txResult.loading}
                tooltipText={areNoRewards && 'No tokens to claim'}
                onClick={() => {
                  // try to claim everything just in case
                  const { cw20, native } = assertDefined(tokensToCheck)
                  claimRewards({
                    fundsDistributorAddress: fundsDistributorContract,
                    cw20Assets: Array.from(cw20),
                    nativeDenoms: Array.from(native),
                  });
                }}
              >
                Claim all
              </PrimaryButton>
            </>
          )}
        </VStack>
      </TitledContent>
    </Panel>
  )
}