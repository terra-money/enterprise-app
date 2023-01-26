import { useNavigate } from 'react-router';
import { Container } from '@terra-money/apps/components';
import { SearchInput } from 'components/primitives';
import { useVotingPowerQuery } from 'queries';
import { ProposalCard } from '../../shared/ProposalCard';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { HStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { EmptyStatePlaceholder } from 'lib/ui/EmptyStatePlaceholder';
import { InternalLink } from 'components/link';
import styles from './ProposalsPage.module.sass';
import { Text } from 'lib/ui/Text';
import { Divider } from '@mui/material';

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

  const proposalStatuses = [
    { label: 'Pending', value: 'in_progress' },
    { label: 'Executed', value: 'executed' },
    { label: 'Passed', value: 'passed' },
    { label: 'Failed', value: 'rejected' },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (showDropdown) {
      const handleClick = (event: MouseEvent) => {
        if (!dropdownRef.current || !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [showDropdown]);

  const proposals = useMemo(() => {
    return proposalsQuery?.filter((proposal) => {
      return proposal.title.toLowerCase().includes(search.searchText);
    });
  }, [proposalsQuery, search.searchText]);

  const filteredProposals = useMemo(() => {
    if (!selectedStatusFilter) {
      return proposals;
    }
    return proposals?.filter((item) => item.status === selectedStatusFilter);
  }, [proposals, selectedStatusFilter]);

  const handleStatusFilterChange = (event: any) => {
    if (event.target.value === selectedStatusFilter) {
      setSelectedStatusFilter('');
    } else {
      setSelectedStatusFilter(event.target.value);
    }
  };

  const navigate = useNavigate();

  const amICouncilMember = useAmICouncilMember();

  const newProposalsDisabled = votingPower.lte(0) && !amICouncilMember;

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

          <PrimaryButton
            className={styles.filterButton}
            as="div"
            kind="secondary"
            onClick={() => {
              handleToggleDropdown();
            }}
          >
            <ResponsiveView small={() => 'Filter'} normal={() => 'Filter'} />
          </PrimaryButton>
          <Container ref={dropdownRef}>
            {showDropdown && (
              <div ref={dropdownRef}>
                <Container className={styles.filterContainer} direction="column">
                  <Text className={styles.filterLabel}>Proposal Status</Text>
                  <Container direction='column' gap={10}>
                    {proposalStatuses.map((filter) => (
                      <div key={filter.value} className={styles.filterOption}>
                        <Container direction="row" gap={10}>
                          <input
                            type="radio"
                            name="filter"
                            value={filter.value}
                            checked={filter.value === selectedStatusFilter}
                            onChange={handleStatusFilterChange}
                          />
                          <label>{filter.label}</label>
                        </Container>
                      </div>
                    ))}
                  </Container>
                  <Divider></Divider>
                  <Text className={styles.resetButton} onClick={() => setSelectedStatusFilter('')}>Reset all filters</Text>
                </Container>
              </div>
            )}
          </Container>
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
          filteredProposals?.map((proposal, index) => (
            <ProposalCard key={index} variant="extended" proposal={proposal} />
          ))
        )}
      </Container>
    </Container>
  );
};
