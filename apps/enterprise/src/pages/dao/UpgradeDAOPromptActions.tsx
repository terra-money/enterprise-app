import { useActiveUpgradeProposalQuery } from 'dao/hooks/useActiveUpgradeProposalQuery';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useDoIHaveVotingPowerQuery } from 'dao/hooks/useDoIHaveVotingPowerQuery';
import { useCurrentDaoAddress } from 'dao/navigation';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { HStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { getCreateUpgradeProposalPath, getProposalPath } from 'proposal/navigation';

export const UpgradeDAOPromptActions = () => {
  const address = useCurrentDaoAddress();
  const amICouncilMember = useAmICouncilMember();

  const { data: doIHaveVotingPower } = useDoIHaveVotingPowerQuery();

  const { data: activeUpgradeProposal, isLoading: isLoadingActiveUpgradeProposal } = useActiveUpgradeProposalQuery();

  if (isLoadingActiveUpgradeProposal && !activeUpgradeProposal) return null;

  return (
    <HStack alignItems="center" gap={12}>
      {activeUpgradeProposal ? (
        <InternalLink to={getProposalPath({ daoAddress: address, proposalId: activeUpgradeProposal.id })}>
          <PrimaryButton as="div">View proposal</PrimaryButton>
        </InternalLink>
      ) : (
        <>
          {doIHaveVotingPower && (
            <InternalLink to={getCreateUpgradeProposalPath({ daoAddress: address, votingType: 'general' })}>
              <PrimaryButton as="div">Create proposal</PrimaryButton>
            </InternalLink>
          )}
          {amICouncilMember && (
            <InternalLink to={getCreateUpgradeProposalPath({ daoAddress: address, votingType: 'council' })}>
              <PrimaryButton as="div">Create emergency proposal</PrimaryButton>
            </InternalLink>
          )}
        </>
      )}
    </HStack>
  );
};
