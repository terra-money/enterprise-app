import { getDaoPath } from "navigation"
import { enterprise } from "types/contracts"

interface CreateUpgradeProposalPathParams {
  daoAddress: string
  votingType: enterprise.ProposalType
}

export const getCreateUpgradeProposalPath = ({ daoAddress, votingType }: CreateUpgradeProposalPathParams) => `${getDaoPath(daoAddress)}/proposals/create/upgrade?votingType=${votingType}`