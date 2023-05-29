import { demicrofy } from '@terra-money/apps/libs/formatting';
import { useFetchEveryPage, usePaginatedResultItems } from '@terra-money/apps/queries';
import { CW20Addr, u } from '@terra-money/apps/types';
import { capitalizeFirstLetter } from '@terra-money/apps/utils';
import Big from 'big.js';
import { Address } from 'components/address';
import { Text } from 'components/primitives';
import { toPercents } from 'lib/shared/utils/toPercents';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { VStack } from 'lib/ui/Stack';
import { useCW20TokenInfoQuery, useTokenStakingAmountQuery } from 'queries';
import { useProposalVotesQuery } from 'queries/useProposalVotesQuery';
import { useCurrentProposal } from './CurrentProposalProvider';
import styled from 'styled-components';
import { Center } from 'lib/ui/Center';
import { Spinner } from 'lib/ui/Spinner';

const Content = styled.div`
  display: grid;
  grid-template-columns: 80px auto 80px 200px;

  > * {
    :last-child {
      justify-self: end;
    }
  }

  @media (max-width: 800px) {
    grid-template-columns: auto auto;

    > * {
      :last-child {
        justify-self: start;
      }
    }
  }
`;

// TODO: display date when contracts provide it
export const ProposalVotes = () => {
  const proposal = useCurrentProposal();
  const { totalVotes, status, dao } = useCurrentProposal();
  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const proposalVotesQuery = useProposalVotesQuery({
    proposalId: proposal.id,
    contract: proposal.dao.address as CW20Addr,
  });
  useFetchEveryPage(proposalVotesQuery);
  const { data: proposalVotesPages, hasNextPage } = proposalVotesQuery;

  const { data: token } = useCW20TokenInfoQuery(proposal.dao.membershipContractAddress);

  const votes = usePaginatedResultItems(proposalVotesPages, (response) => response.votes).sort((a, b) =>
    b.amount.sub(a.amount).toNumber()
  );

  const isSmallScreen = useIsSmallScreen();

  // TODO: reuse with ProposalVotingBar
  const totalAvailableVotes =
    dao.type === 'multisig' ? totalVotes : status === 'in_progress' ? totalStaked : totalVotes;

  return (
    <LabeledPageSection name="Votes">
      <VStack gap={16}>
        {hasNextPage ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          votes.map(({ outcome, amount, voter }, index) => (
            <Panel key={index}>
              <Content>
                <Text variant="heading4">{capitalizeFirstLetter(outcome)}</Text>
                <Address truncation={isSmallScreen ? [7, 4] : undefined} address={voter} />
                {totalAvailableVotes.gt(0) && (
                  <Text variant="text">{toPercents(amount.div(totalAvailableVotes).toNumber(), undefined, 3)}</Text>
                )}
                {proposal.type !== 'council' && token && (
                  <Text variant="text">{`${demicrofy(amount, token.decimals ?? 6)} ${token.symbol}`}</Text>
                )}
              </Content>
            </Panel>
          ))
        )}
      </VStack>
    </LabeledPageSection>
  );
};
