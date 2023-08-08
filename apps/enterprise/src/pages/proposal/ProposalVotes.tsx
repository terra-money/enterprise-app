import { fromChainAmount } from 'chain/utils/fromChainAmount';

import Big from 'big.js';
import { Text } from 'lib/ui/Text';
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
import { Address } from 'chain/components/Address';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import { usePaginatedResultItems } from 'lib/query/hooks/usePaginatedResultItems';
import { useFetchEveryPage } from 'lib/query/hooks/useFetchEveryPage';

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
  const { data: totalStaked = Big(0) as Big } = useTokenStakingAmountQuery(dao.address);

  const proposalVotesQuery = useProposalVotesQuery({
    proposalId: proposal.id,
    contract: proposal.dao.address,
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
    proposal.type === 'council'
      ? Big(dao.council?.members.length!)
      : dao.type === 'multisig'
      ? totalVotes
      : status === 'in_progress'
      ? totalStaked
      : totalVotes;

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
                <Text weight="semibold">{capitalizeFirstLetter(outcome)}</Text>
                <Address length={isSmallScreen ? 's' : undefined} value={voter} />
                {totalAvailableVotes.gt(0) && (
                  <Text size={14} color="supporting">
                    {toPercents(amount.div(totalAvailableVotes).toNumber(), undefined, 3)}
                  </Text>
                )}
                {proposal.type !== 'council' && token && (
                  <Text size={14} color="supporting">{`${fromChainAmount(amount.toString(), token.decimals ?? 6)} ${
                    token.symbol
                  }`}</Text>
                )}
              </Content>
            </Panel>
          ))
        )}
      </VStack>
    </LabeledPageSection>
  );
};
