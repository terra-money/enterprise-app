import { AnimatedPage } from '@terra-money/apps/components';
import { ReactNode, useRef, useState } from 'react';
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
import { Text } from 'lib/ui/Text';
import { useMyVotingPower } from 'dao/components/MyVotingPowerProvider';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { daoProposalsRecord, proposalTitle, ProposalType } from 'dao/shared/proposal';
import { CouncilProposalActionType } from 'pages/create-dao/shared/ProposalTypesInput';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import styles from './SelectProposalType.module.sass';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { toDao } from 'dao/utils/toDao';

const title = 'Create a proposal';
const contractsProposalTypeRecord: Record<CouncilProposalActionType, ProposalType> = {
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  upgrade_dao: 'upgrade',
  update_metadata: 'metadata',
};

export const proposalDescription: Record<ProposalType, ReactNode> = {
  text: 'Create general-purpose petitions, such as asking the DAO to partner with another protocol or for the DAO to implement a new feature',
  config: 'Update DAO configurations such as governance parameters and DAO metadata',
  upgrade: 'Upgrade your DAO to the latest contracts to get upgraded features',
  assets: 'Update whitelisted assets',
  nfts: 'Add/remove assets thats displayed on the Treasury page',
  execute: <>
    Execute custom messages that will allow you to interact with smart contracts, send assets and more. <ExternalLink to="https://docs.enterprise.money/guides/messages"><ShyTextButton as="span" text="Click here" /></ExternalLink> for more information on message templates.
  </>,
  members: 'Add/remove members from the Multisig',
  spend: 'Submit this proposal to send assets in your treasury to another address',
  mint: 'Mint DAO governance tokens to accounts. This only works if the minter of the CW20 token is the DAO treasury address.',
  burn: 'Burn DAO governance tokens from accounts. This only works if the burner of the CW20 token is the DAO treasury address.',
  delegate: 'Delegate LUNA in your treasury with a validator of your choice to earn staking rewards',
  metadata: 'Update metadata of your DAO',
  undelegate: 'Undelegate LUNA from a validator that you have delegated to',
  redelegate: 'Redelegate LUNA from your current validator to a new validator',
  council: '',
  mintNft:
    'Mint a new DAO governance NFT to an account. This only works if the minter of the NFT is the DAO treasury address.',
  minWeightForRewards: 'Update the minimum weight for rewards',
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

export type ProposalVotingType = typeof proposalVotingTypes[number];

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

  const ref = useRef<HTMLDivElement>(null);

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
            <ProposalsContainer>
              <NormalScreenContent>{renderOptions()}</NormalScreenContent>
              <ProposalDescriptionContainer>
                <Text className={styles.proposalDescriptionTitle}>
                  What is a {capitalizeFirstLetter(proposalType)} proposal?
                </Text>
                <Text className={styles.proposalDescription}>{proposalDescriptionText}</Text>
              </ProposalDescriptionContainer>
            </ProposalsContainer>
            {renderFooter()}
          </NormalScreenContainer>
        </AnimatedPage>
      )}
    />
  );
};
