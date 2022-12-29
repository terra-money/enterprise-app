import { AnimatedPage } from '@terra-money/apps/components';
import { useRef, useState } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router';
import { Button } from 'components/primitives';
import { FormFooter } from 'components/form-footer';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileCreateProposalHeader } from './MobileCreateProposalHeader';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import styled from '@emotion/styled';
import { without } from 'lodash';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { Text } from 'lib/ui/Text';
import { useMyVotingPower } from 'dao/components/MyVotingPowerProvider';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';

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

export const SelectProposalType = () => {
  const dao = useCurrentDao();
  const myVotingPower = useMyVotingPower();

  const ref = useRef<HTMLDivElement>(null);

  const [proposalType, setProposalType] = useState<ProposalType>('text');

  const navigate = useNavigate();
  const amICouncilMember = useAmICouncilMember();

  const [proposalVotingType, setProposalVotingType] = useState<ProposalVotingType>(() =>
    amICouncilMember ? 'council' : 'regular'
  );

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
    const options = getProposalOptions(dao, proposalVotingType);

    if (proposalVotingType === 'council' && !amICouncilMember) {
      return <Text>Only council members can create emergency proposals.</Text>;
    }

    if (proposalVotingType === 'regular' && myVotingPower.eq(0)) {
      return <Text>You don't have voting power to create a regular proposal.</Text>;
    }

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
    const { address } = dao;
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
  );
};
