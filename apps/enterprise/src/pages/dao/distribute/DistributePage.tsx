import { ConditionalWallet } from "components/conditional-wallet"
import { RewardsPanel } from "../staking/RewardsPanel"

export const DistributePage = () => {
  return (
    <ConditionalWallet
      connected={() => <RewardsPanel />}
    />
  )
}