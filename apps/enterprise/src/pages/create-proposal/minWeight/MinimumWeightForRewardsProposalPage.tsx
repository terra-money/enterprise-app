import { CurrentDAOMinimumWeightForRewardsProvider } from "./CurrentDAOMinimumWeightForRewardsProvider"
import { UpdateMinimumWeightForRewardsForm } from "./UpdateMinimumWeightForRewardsForm"

export const MinimumWeightForRewardsProposalPage = () => {
  return (
    <CurrentDAOMinimumWeightForRewardsProvider>
      <UpdateMinimumWeightForRewardsForm />
    </CurrentDAOMinimumWeightForRewardsProvider>
  )
}