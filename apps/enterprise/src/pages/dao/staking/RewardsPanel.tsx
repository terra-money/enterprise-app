import { assertDefined } from "@terra-money/apps/utils";
import { Panel } from "components/panel"
import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useClaimRewardsTx } from "dao/tx/useClaimRewardsTx";
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton";
import { VStack } from "lib/ui/Stack";
import { useDAOAssetsWhitelist, useGlobalAssetsWhitelist } from "queries";
import { useMemo } from "react";

export const RewardsPanel = () => {
  const { fundsDistributorContract, address, type, membershipContractAddress } = useCurrentDao()
  const { data: globalWhitelist } = useGlobalAssetsWhitelist()
  const { data: daoWhitelist } = useDAOAssetsWhitelist(address)

  const tokensToClaim = useMemo(() => {
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

  const [txResult, claimRewards] = useClaimRewardsTx()

  return (
    <Panel title="Rewards">
      <VStack fullHeight gap={40} justifyContent="space-between">
        <div />
        <PrimaryButton
          kind="secondary"
          isDisabled={!tokensToClaim}
          isLoading={txResult.loading}
          // tooltipText={isClaimDisabled && 'No tokens to claim'}
          onClick={() => {
            const { cw20, native } = assertDefined(tokensToClaim)
            claimRewards({
              fundsDistributorAddress: fundsDistributorContract,
              cw20Assets: Array.from(cw20),
              nativeDenoms: Array.from(native),
            });
          }}
        >
          Claim all
        </PrimaryButton>
      </VStack>
    </Panel>
  )
}