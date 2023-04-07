import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useAmICouncilMember } from "dao/hooks/useAmICouncilMember";
import { useDoIHaveVotingPowerQuery } from "dao/hooks/useDoIHaveVotingPowerQuery";
import { InternalLink } from "lib/navigation/Link/InternalLink";
import { HStack } from "lib/ui/Stack";
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton";
import { getCreateUpgradeProposalPath } from "proposal/navigation";

export const UpgradeDAOPromptActions = () => {
  const { address } = useCurrentDao();
  const amICouncilMember = useAmICouncilMember();

  const { data: doIHaveVotingPower } = useDoIHaveVotingPowerQuery()

  return (
    <HStack alignItems="center" gap={12}>
      {doIHaveVotingPower && (
        <InternalLink to={getCreateUpgradeProposalPath({ daoAddress: address, votingType: 'general' })}>
          <PrimaryButton as="div">
            Create proposal
          </PrimaryButton>
        </InternalLink>
      )}
      {amICouncilMember && (
        <InternalLink to={getCreateUpgradeProposalPath({ daoAddress: address, votingType: 'council' })}>
          <PrimaryButton as="div">
            Create emergency proposal
          </PrimaryButton>
        </InternalLink>
      )}
    </HStack>
  )
}