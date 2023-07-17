import { HStack } from 'lib/ui/Stack';
import { useBlockHeightQuery } from 'queries';
import {
  getProposalStatusName,
  getProposalTypeName,
  proposalActionTypeName,
  proposalStatusNames,
} from 'dao/shared/proposal';
import { Proposal } from 'dao/shared/proposal';
import { useTheme } from 'styled-components';
import { Tag } from 'lib/ui/Tag';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';

interface ProposalStatusProps {
  className?: string;
  proposal: Proposal;
}

export const ProposalTags = (props: ProposalStatusProps) => {
  const { proposal } = props;

  const { colors } = useTheme();

  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const status = getProposalStatusName(proposal, blockHeight);

  const proposalTypeName = getProposalTypeName(proposal);

  return (
    <HStack alignItems="center" wrap="wrap" gap={8}>
      <Tag color={colors.getLabelColor(proposalStatusNames.indexOf(status))}>{status}</Tag>
      <Tag color={colors.getLabelColor(proposalActionTypeName.indexOf(proposalTypeName))}>
        {capitalizeFirstLetter(proposalTypeName)}
      </Tag>
      {proposal.type === 'council' && <Tag color={colors.alert}>Emergency</Tag>}
    </HStack>
  );
};
