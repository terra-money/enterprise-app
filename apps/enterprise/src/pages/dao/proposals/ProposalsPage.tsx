import { useNavigate } from 'react-router';
import { Container } from '@terra-money/apps/components';
import { Button, SearchInput, Tooltip } from 'components/primitives';
import { useProposalsQuery, useVotingPowerQuery } from 'queries';
import { ProposalCard } from '../../shared/ProposalCard';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useMemo, useState } from 'react';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { HStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';

const LIMIT = 10;

export const ProposalsPage = () => {
  const dao = useCurrentDao();

  const connectedWallet = useConnectedWallet();

  const { data: proposalsQuery } = useProposalsQuery({
    daoAddress: dao?.address,
    limit: LIMIT,
    enabled: Boolean(dao?.address),
  });

  const { data: votingPower = Big(0) } = useVotingPowerQuery(dao?.address, connectedWallet?.walletAddress);

  const [search, setSearch] = useState({
    input: '',
    searchText: '',
  });

  const proposals = useMemo(() => {
    return proposalsQuery?.filter((proposal) => {
      return proposal.title.toLowerCase().includes(search.searchText);
    });
  }, [proposalsQuery, search.searchText]);

  const navigate = useNavigate();

  const amICouncilMember = useAmICouncilMember();

  const newProposalsDisabled = votingPower.lte(0) && !amICouncilMember;

  return (
    <Container direction="column" gap={32}>
      <HStack justifyContent="space-between" gap={16} fullWidth>
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
        <Tooltip
          title={
            newProposalsDisabled
              ? 'You must have voting power for this DAO to be able to create a new proposal.'
              : 'Create a new proposal for the DAO.'
          }
        >
          <Button
            component="div"
            variant="primary"
            disabled={newProposalsDisabled}
            onClick={() => {
              if (newProposalsDisabled === false) {
                navigate(`/dao/${dao?.address}/proposals/create`);
              }
            }}
          >
            <ResponsiveView small={() => 'New'} normal={() => 'New Proposal'} />
          </Button>
        </Tooltip>
      </HStack>
      <Container direction="column" gap={16}>
        {proposals === undefined
          ? [...Array(LIMIT)].map((_, index) => <ProposalCard key={index} variant="extended" />)
          : proposals.map((proposal, index) => <ProposalCard key={index} variant="extended" proposal={proposal} />)}
      </Container>
    </Container>
  );
};
