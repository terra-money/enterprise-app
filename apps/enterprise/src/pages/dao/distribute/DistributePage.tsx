import { ConditionalWallet } from "components/conditional-wallet"
import { VStack } from "lib/ui/Stack"
import { RewardsPanel } from "../staking/RewardsPanel"
import { DepositIntoFundsDistributor } from "./deposit"

export const DistributePage = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <VStack gap={16}>
          <RewardsPanel />
          <DepositIntoFundsDistributor />
        </VStack>
      )}
    />
  )
}