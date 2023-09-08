import { ProposalVotingBar } from './ProposalVotingBar';
import { ProposalExpiration } from './ProposalExpiration';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { ProposalVotingAction } from './ProposalVotingAction';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { Text } from 'lib/ui/Text';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { getFinderUrl } from 'chain/utils/getFinderUrl';
import { ShyTextButtonInline } from 'lib/ui/buttons/ShyTextButtonInline';
import Big from 'big.js';
import { useMemo } from 'react';
import { useTokenStakingAmountQuery } from 'queries';
import { formatNumber } from '@terra.kitchen/utils';
import { getRatio } from 'lib/shared/utils/getRatio';
import { toPercents } from 'lib/shared/utils/toPercents';

export const ProposalVoting = () => {
  const { executionTxHash, yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao, type } = useCurrentProposal();

  const networkName = useNetworkName();

  const { data: totalStaked = Big(0) as Big } = useTokenStakingAmountQuery(dao.address);

  const totalAvailableVotes = useMemo(() => {
    if (type === 'council') return totalVotes;

    if (dao.type === 'multisig') return totalVotes;

    return status === 'in_progress' ? totalStaked : totalVotes;
  }, [dao.type, status, totalStaked, totalVotes, type]);

  const total = yesVotes.add(noVotes).add(abstainVotes).add(vetoVotes);

  return (
    <VStack gap={16}>
      <HStack justifyContent="space-between" alignItems="center" gap={8} wrap="wrap">
        <Text weight="semibold" color="contrast" size={18}>
          Progress
        </Text>
        <ProposalExpiration />
      </HStack>
      <Text size={14} color="supporting">Total voted: {formatNumber(Number(total), {comma: true})} ({toPercents(getRatio(total, totalAvailableVotes).toNumber(), undefined, 2)})</Text>
      <Panel>
        <HStack justifyContent="center" alignItems="center" wrap="wrap" gap={20}>
          <ProposalVotingBar />
          <ProposalVotingAction />
        </HStack>
      </Panel>
      {executionTxHash && (
        <HStack alignItems="center" gap={8}>
          <Text color="shy">Transaction:</Text>
          <ExternalLink
            style={{ minWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden' }}
            to={getFinderUrl(networkName, executionTxHash)}
          >
            <ShyTextButtonInline text={executionTxHash} />
          </ExternalLink>
        </HStack>
      )}
    </VStack>
  );
};