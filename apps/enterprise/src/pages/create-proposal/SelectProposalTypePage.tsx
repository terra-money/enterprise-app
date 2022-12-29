import { AnimatedPage } from '@terra-money/apps/components';
import { useRef, useState } from 'react';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { Header } from './Header';
import { useNavigate, useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { Button } from 'components/primitives';
import { FormFooter } from 'components/form-footer';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileCreateProposalHeader } from './MobileCreateProposalHeader';
import { assertDefined } from '@terra-money/apps/utils';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import styled from '@emotion/styled';
import { without } from 'lodash';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

const sharedProposalTypes = [
  'text',
  'config',
  'upgrade',
  'assets',
  'nfts',
  'execute',
  'spend',
  'delegate',
  'council',
] as const;

const daoProposalsRecord = {
  multisig: [...sharedProposalTypes, 'members'] as const,
  token: [...sharedProposalTypes, 'mint', 'burn'] as const,
  nft: sharedProposalTypes,
} as const;

export type ProposalType =
  | typeof daoProposalsRecord.multisig[number]
  | typeof daoProposalsRecord.token[number]
  | typeof daoProposalsRecord.nft[number];

const contractsProposalTypeRecord: Partial<Record<enterprise.ProposalActionType, ProposalType>> = {
  // TODO
  // update_metadata
  // update_config
  // request_funding_from_dao

  update_council: 'council',
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  upgrade_dao: 'upgrade',
  execute_msgs: 'execute',
  modify_multisig_membership: 'members',
};

export const proposalTitle: Record<ProposalType, string> = {
  text: 'Text proposal',
  config: 'Update configuration proposal',
  upgrade: 'Upgrade proposal',
  assets: 'Update whitelisted assets',
  nfts: 'Update whitelisted NFTs',
  execute: 'Proposal to execute message',
  members: 'Update multisig members',
  spend: 'Spend treasury proposal',
  mint: 'Mint token proposal',
  burn: 'Burn token proposal',
  delegate: 'Delegate LUNA proposal',
  council: 'Update council',
};

const title = 'Create a proposal';

// TODO: turn into a reusable component
const NormalScreenContainer = styled(VStack)`
  padding: 48px 48px 64px 48px;
  height: 100%;
  gap: 32px;
`;

const NormalScreenContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const proposalVotingTypes = ['regular', 'council'] as const;

export type ProposalVotingType = typeof proposalVotingTypes[number];

const proposalVotingTypeName: Record<ProposalVotingType, string> = {
  regular: 'Regular',
  council: 'Emergency',
};

const getProposalOptions = ({ type, council }: DAO, proposalVotingType: ProposalVotingType) => {
  const options = daoProposalsRecord[type];
  if (council) {
    if (proposalVotingType === 'regular') {
      return options;
    }
    const { allowed_proposal_action_types } = council;
    if (allowed_proposal_action_types) {
      return allowed_proposal_action_types.reduce((acc, type) => {
        const proposalType = contractsProposalTypeRecord[type];
        if (proposalType) {
          acc.push(proposalType);
        }

        return acc;
      }, [] as ProposalType[]);
    }
  }

  return without(options, 'council');
};

export const SelectProposalTypePage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const ref = useRef<HTMLDivElement>(null);

  const [proposalType, setProposalType] = useState<ProposalType>('text');

  const navigate = useNavigate();

  const [proposalVotingType, setProposalVotingType] = useState<ProposalVotingType>('regular');

  const renderVotingTypePicker = () => {
    if (!dao?.council) return null;

    return (
      <PrimarySelect
        direction="row"
        label="Choose category"
        options={proposalVotingTypes}
        getName={(view) => proposalVotingTypeName[view]}
        selectedOption={proposalVotingType}
        onSelect={setProposalVotingType}
        groupName="proposal-voting-type"
      />
    );
  };

  const renderOptions = () => {
    const options = getProposalOptions(assertDefined(dao), proposalVotingType);

    return (
      <PrimarySelect
        label="Choose type"
        options={options}
        getName={(type) => proposalTitle[type]}
        selectedOption={proposalType}
        onSelect={setProposalType}
        groupName="proposal-type"
      />
    );
  };

  const renderFooter = () => {
    const { address } = assertDefined(dao);
    return (
      <FormFooter
        primary={
          <Button
            onClick={() =>
              navigate(`/dao/${address}/proposals/create/${proposalType}?votingType=${proposalVotingType}`)
            }
            variant="primary"
          >
            Next
          </Button>
        }
        secondary={<Button onClick={() => navigate(`/dao/${address}`)}>Cancel</Button>}
      />
    );
  };

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <ResponsiveView
              small={() => (
                <VStack gap={24}>
                  <MobileCreateProposalHeader title={title} />
                  {renderVotingTypePicker()}
                  {renderOptions()}
                  {renderFooter()}
                </VStack>
              )}
              normal={() => (
                <AnimatedPage>
                  <NormalScreenContainer>
                    <Header ref={ref} title={title} />
                    {renderVotingTypePicker()}
                    <NormalScreenContent>{renderOptions()}</NormalScreenContent>
                    {renderFooter()}
                  </NormalScreenContainer>
                </AnimatedPage>
              )}
            />
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};
