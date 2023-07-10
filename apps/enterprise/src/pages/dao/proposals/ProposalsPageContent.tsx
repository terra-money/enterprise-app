import { useNavigate } from 'react-router';
import { Stack } from 'lib/ui/Stack';
import { ProposalCard } from '../../shared/ProposalCard';
import { useMemo, useState } from 'react';
import { HStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';
import { Button } from 'lib/ui/buttons/Button';
import { EmptyStatePlaceholder } from 'lib/ui/EmptyStatePlaceholder';
import { InternalLink } from 'components/link';
import { enterprise } from 'types/contracts';
import { proposalStatuses } from 'proposal';
import { ProposalsFilter } from './ProposalsFilter';
import { useDoIHaveVotingPowerQuery } from 'dao/hooks/useDoIHaveVotingPowerQuery';
import { useCurrentDaoAddress } from 'dao/navigation';
import { SearchInput } from 'lib/ui/inputs/SearchInput';

const LIMIT = 100;

export const ProposalsPageContent = () => {
  const address = useCurrentDaoAddress();

  const { data: proposalsQuery, isLoading } = useDaoProposalsQuery({ address });

  const [searchText, setSearchText] = useState('');

  const [statusesToDisplay, setStatusesToDisplay] = useState<enterprise.ProposalStatus[]>(proposalStatuses);

  const proposals = useMemo(() => {
    return proposalsQuery
      ?.filter((proposal) => {
        return proposal.title.toLowerCase().includes(searchText);
      })
      .filter(({ status }) => statusesToDisplay.includes(status));
  }, [proposalsQuery, searchText, statusesToDisplay]);

  const navigate = useNavigate();

  const amICouncilMember = useAmICouncilMember();
  const { data: doIHaveVotingPower } = useDoIHaveVotingPowerQuery();

  const newProposalsDisabled = !doIHaveVotingPower && !amICouncilMember;

  return (
    <Stack direction="column" gap={32}>
      <HStack justifyContent="space-between" gap={16} fullWidth>
        <HStack alignItems="center" gap={16}>
          <SearchInput style={{ maxWidth: 400 }} value={searchText} onValueChange={(input) => setSearchText(input)} />
          <ProposalsFilter value={statusesToDisplay} onChange={setStatusesToDisplay} />
        </HStack>
        <Button
          as="div"
          isDisabled={newProposalsDisabled && 'Only members of this DAO can create proposals.'}
          onClick={() => {
            if (newProposalsDisabled === false) {
              navigate(`/dao/${address}/proposals/create`);
            }
          }}
        >
          <ResponsiveView small={() => 'New'} normal={() => 'New Proposal'} />
        </Button>
      </HStack>
      <Stack direction="column" gap={16}>
        {!proposals || proposals.length < 1 ? (
          isLoading ? (
            [...Array(LIMIT)].map((_, index) => <ProposalCard key={index} variant="extended" />)
          ) : (
            <EmptyStatePlaceholder
              message={`No proposals have been created for this DAO yet. ${
                newProposalsDisabled ? '' : ' Click here to create a new proposal.'
              }`}
              action={
                newProposalsDisabled ? undefined : (
                  <InternalLink to={`/dao/${address}/proposals/create`}>
                    <Button as="div" kind="secondary">
                      Create
                    </Button>
                  </InternalLink>
                )
              }
            />
          )
        ) : (
          proposals?.map((proposal, index) => <ProposalCard key={index} variant="extended" proposal={proposal} />)
        )}
      </Stack>
    </Stack>
  );
};
