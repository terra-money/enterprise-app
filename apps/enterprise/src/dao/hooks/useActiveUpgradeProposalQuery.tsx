import { useCurrentDao } from "dao/components/CurrentDaoProvider"
import { useDaoProposalsQuery } from "queries/useDaoProposalsQuery"

// TODO: either query for all proposals or wait for contract query to be implemented
export const useActiveUpgradeProposalQuery = () => {
  const { address } = useCurrentDao()
  const { data, ...rest } = useDaoProposalsQuery({ address })

  return {
    ...rest,
    data: data?.find(proposal => {
      const isUpgradeProposal = proposal.actions.find(action => 'upgrade_dao' in action)
      if (!isUpgradeProposal) return false

      const isActiveProposal = proposal.status === 'in_progress' || proposal.status === 'passed'
      return isActiveProposal
    })
  }
}