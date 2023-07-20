import { useNavigate } from 'react-router';
import { Stack } from 'lib/ui/Stack';
import { ProposalCard } from '../../shared/ProposalCard';
import { useState } from 'react';
import { HStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';
import { Button } from 'lib/ui/buttons/Button';
import { enterprise } from 'types/contracts';
import { proposalStatuses } from 'proposal';
import { ProposalsFilter } from './ProposalsFilter';
import { useDoIHaveVotingPowerQuery } from 'dao/hooks/useDoIHaveVotingPowerQuery';
import { useCurrentDaoAddress } from 'dao/navigation';
import { SearchInput } from 'lib/ui/inputs/SearchInput';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { CurrentProposalProvider } from 'pages/proposal/CurrentProposalProvider';

export const ProposalsPageContent = () => {
  const address = useCurrentDaoAddress();

  const { data, status } = useDaoProposalsQuery({ address });

  const [searchText, setSearchText] = useState('');

  const [statusesToDisplay, setStatusesToDisplay] = useState<enterprise.ProposalStatus[]>(proposalStatuses);

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
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => <Text>Failed to load</Text>}
          success={(proposals) => {
            const items = searchText
              ? proposals.filter((proposal) => proposal.title.toLowerCase().includes(searchText.toLowerCase()))
              : proposals;

            return items.map((proposal, index) => (
              <CurrentProposalProvider key={proposal.id} value={proposal}>
                <ProposalCard />
              </CurrentProposalProvider>
            ));
          }}
        />
      </Stack>
    </Stack>
  );
};
