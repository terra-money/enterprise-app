import { useNavigate } from 'react-router';
import { Container } from '@terra-money/apps/components';
import { SearchInput } from 'components/primitives';
import { useVotingPowerQuery } from 'queries';
import { ProposalCard } from '../../shared/ProposalCard';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useMemo, useState } from 'react';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { HStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
// import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { EmptyStatePlaceholder } from 'lib/ui/EmptyStatePlaceholder';
import { InternalLink } from 'components/link';
import { enterprise } from 'types/contracts';
import { proposalStatuses } from 'proposal';
import { ProposalsFilter } from './ProposalsFilter';

const LIMIT = 100;

export const ProposalsPage = () => {
  const dao = useCurrentDao();

  const connectedWallet = useConnectedWallet();

  const { data: proposalsQuery, isLoading } = useDaoProposalsQuery({ address: dao.address });

  const { data: votingPower = Big(0) } = useVotingPowerQuery(dao?.address, connectedWallet?.walletAddress);

  const [search, setSearch] = useState({
    input: '',
    searchText: '',
  });
  const [statusesToDisplay, setStatusesToDisplay] = useState<enterprise.ProposalStatus[]>(proposalStatuses);

  const proposals = useMemo(() => {
    return proposalsQuery?.filter((proposal) => {
      return proposal.title.toLowerCase().includes(search.searchText);
    }).filter(({ status }) => statusesToDisplay.includes(status));
  }, [proposalsQuery, search.searchText, statusesToDisplay]);

  const navigate = useNavigate();

  // const amICouncilMember = useAmICouncilMember();

  const newProposalsDisabled = votingPower.lte(0);

  return (
    <Container direction="column" gap={32}>
      <HStack justifyContent="space-between" gap={16} fullWidth>
        <Container direction='row' gap={16}>
          <SearchInput
            value={search.input}
            onChange={(input) =>
              setSearch((previous) => {
                return {
                  ...previous,
                  input,
                };
              })
            }
            onClear={() =>
              setSearch({
                input: '',
                searchText: '',
              })
            }
            onSearch={() =>
              setSearch((previous) => {
                return {
                  ...previous,
                  searchText: previous.input,
                };
              })
            }
          />

          <ProposalsFilter
            value={statusesToDisplay}
            onChange={setStatusesToDisplay}
          />
        </Container>
        <PrimaryButton
          as="div"
          isDisabled={
            newProposalsDisabled && 'You must have voting power for this DAO to be able to create a new proposal.'
          }
          onClick={() => {
            if (newProposalsDisabled === false) {
              navigate(`/dao/${dao?.address}/proposals/create`);
            }
          }}
        >
          <ResponsiveView small={() => 'New'} normal={() => 'New Proposal'} />
        </PrimaryButton>
      </HStack>
      <Container direction="column" gap={16}>
        {!proposals || proposals.length < 1 ? (
          isLoading ? (
            [...Array(LIMIT)].map((_, index) => <ProposalCard key={index} variant="extended" />)
          ) : (
            <EmptyStatePlaceholder
              message={`No proposals have been created for this DAO yet. ${newProposalsDisabled ? '' : 'To create a new proposal click here'
                }`}
              action={
                newProposalsDisabled ? undefined : (
                  <InternalLink to={`/dao/${dao?.address}/proposals/create`}>
                    <PrimaryButton as="div" kind="secondary">
                      Create
                    </PrimaryButton>
                  </InternalLink>
                )
              }
            />
          )
        ) : (
          proposals?.map((proposal, index) => (
            <ProposalCard key={index} variant="extended" proposal={proposal} />
          ))
        )}
      </Container>
    </Container>
  );
};
