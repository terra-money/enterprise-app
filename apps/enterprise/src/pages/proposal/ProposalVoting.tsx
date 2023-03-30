import { ProposalVotingBar } from './ProposalVotingBar';
import { ProposalExpiration } from './ProposalExpiration';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { ProposalVotingAction } from './ProposalVotingAction';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { getFinderUrl } from '@terra-money/apps/utils';
import { useWallet } from '@terra-money/wallet-provider';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Text } from 'lib/ui/Text';

export const ProposalVoting = () => {
  const { executionTxHash } = useCurrentProposal();

  const { network } = useWallet();

  return (
    <VStack gap={16}>
      <HStack justifyContent="space-between" alignItems="center" gap={8} wrap="wrap">
        <Text weight="semibold" color="white" size={18}>
          Progress
        </Text>
        <ProposalExpiration />
      </HStack>
      {executionTxHash && (
        <HStack alignItems="center" gap={8}>
          <Text color="supporting3">Transaction:</Text>
          <ExternalLink to={getFinderUrl(network.name, executionTxHash)}>
            <ShyTextButton text={executionTxHash} />
          </ExternalLink>
        </HStack>
      )}
      <Panel>
        <HStack justifyContent="center" alignItems="center" wrap="wrap" gap={20}>
          <ProposalVotingBar />
          <ProposalVotingAction />
        </HStack>
      </Panel>
    </VStack>
  );
};
