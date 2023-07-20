import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router';
import { Button } from 'lib/ui/buttons/Button';
import { FormFooter } from 'components/form-footer';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileCreateProposalHeader } from './MobileCreateProposalHeader';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import { without } from 'lodash';
import { DAO } from 'types';
import { Text } from 'lib/ui/Text';
import { useMyVotingPower } from 'dao/components/MyVotingPowerProvider';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { daoProposalsRecord, proposalTitle, ProposalType } from 'dao/shared/proposal';
import { CouncilProposalActionType } from 'pages/create-dao/shared/ProposalTypesInput';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { toDao } from 'dao/utils/toDao';
import styled from 'styled-components';

const title = 'Create a proposal';
const contractsProposalTypeRecord: Record<CouncilProposalActionType, ProposalType> = {
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  upgrade_dao: 'upgrade',
  update_metadata: 'metadata',
};

export const proposalDescription: Record<ProposalType, ReactNode> = {
  text: 'Create general-purpose text proposals such as directional statements, community engagement ideas, or partnerships.',
  config: 'Update your DAO configuration, such as governance parameters and DAO metadata.',
  upgrade: 'Upgrade your DAO to get the latest contract features.',
  assets:
    'Update the token whitelist. The whitelist determines which tokens are displayed in the treasury or distributor.',
  nfts: 'Update the NFT whitelist. The whitelist determines which NFTs are displayed in the treasury.',
  execute: (
    <>
      Execute custom messages that will allow you to interact with smart contracts, send assets and more.{' '}
      <ExternalLink to="https://docs.enterprise.money/guides/messages">
        <ShyTextButton as="span" text="Visit the docs" />
      </ExternalLink>{' '}
      for more information on message templates.
    </>
  ),
  members: 'Add or remove members from a Multisig.',
  spend: 'Submit this proposal to send assets in your treasury to another address',
  mint: 'Mint DAO tokens to the specified addresses. This proposal will only work if the minter of the CW20 token is the DAO treasury address.',
  burn: 'Burn DAO tokens from the specified accounts. This proposal will only work if the burner of the CW20 token is the DAO treasury address.',
  delegate: 'Delegate the LUNA in your treasury to a validator of your choice to earn staking rewards.',
  metadata: 'Update the metadata of your DAO.',
  undelegate: 'Undelegate LUNA from a validator that you have delegated to.',
  redelegate: 'Redelegate LUNA from your current validator to a new validator.',
  council: '',
  mintNft:
    'Mint a new DAO NFT to the specified addresses. This proposal will only work if the minter on the NFT contract is the DAO treasury address.',
  minWeightForRewards: 'Update the minimum weight required to receive rewards.',
};

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

const ProposalsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const ProposalDescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 45px 30px;
`;

const proposalVotingTypes = ['general', 'council'] as const;

export type ProposalVotingType = (typeof proposalVotingTypes)[number];

const proposalVotingTypeName: Record<ProposalVotingType, string> = {
  general: 'General',
  council: 'Emergency',
};

const getProposalOptions = ({ type, council }: DAO, proposalVotingType: ProposalVotingType) => {
  const options = daoProposalsRecord[type];
  if (council) {
    if (proposalVotingType === 'general') {
      return options;
    }
    const { allowed_proposal_action_types } = council;
    if (allowed_proposal_action_types) {
      return allowed_proposal_action_types.reduce((acc, type) => {
        const proposalType = contractsProposalTypeRecord[type as CouncilProposalActionType];
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

  const [proposalType, setProposalType] = useState<ProposalType>('text');
  const proposalDescriptionText = proposalDescription[proposalType];
  const navigate = useNavigate();
  const amICouncilMember = useAmICouncilMember();

  const [proposalVotingType, setProposalVotingType] = useState<ProposalVotingType>(() =>
    amICouncilMember ? 'council' : 'general'
  );

  const renderVotingTypePicker = () => {
    if (!dao?.dao_council) return null;

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
    const options = getProposalOptions(toDao(dao), proposalVotingType);

    if (proposalVotingType === 'council' && !amICouncilMember) {
      return <Text>Only council members can create emergency proposals.</Text>;
    }

    if (proposalVotingType === 'general' && myVotingPower.eq(0)) {
      return <Text>You need voting power in this DAO to create a proposal.</Text>;
    }

    return (
      <PrimarySelect
        label="Choose a proposal type"
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
        <NormalScreenContainer>
          <Header title={title} />
          {renderVotingTypePicker()}
          <ProposalsContainer>
            <NormalScreenContent>{renderOptions()}</NormalScreenContent>
            <ProposalDescriptionContainer>
              <Text>What are {capitalizeFirstLetter(proposalType)} proposals?</Text>
              <Text>{proposalDescriptionText}</Text>
            </ProposalDescriptionContainer>
          </ProposalsContainer>
          {renderFooter()}
        </NormalScreenContainer>
      )}
    />
  );
};
