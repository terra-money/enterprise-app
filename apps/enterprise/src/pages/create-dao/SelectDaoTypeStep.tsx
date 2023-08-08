import { WizardBody } from './WizardBody';
import { Text } from 'lib/ui/Text';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';

const daoTypes = ['multisig', 'nft', 'token'] as const;
type DaoType = (typeof daoTypes)[number];

const daoTypeNameRecord: Record<DaoType, string> = {
  multisig: 'Multisig Wallet',
  nft: 'NFT Community DAO',
  token: 'Community Token DAO',
};

const daoTypeExplanationRecord: Record<DaoType, string> = {
  multisig: 'A multisig is a shared wallet with two or more members authorizing transactions.',
  nft: 'In NFT DAOs, users stake NFTs to participate in governance.',
  token: 'In Token DAOs, users stake tokens to participate in governance.',
};

const Container = styled(VStack)`
  gap: 32px;

  padding: 96px 64px 32px 64px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const SelectDaoTypeStep = () => {
  const {
    formState: { type },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardBody
      helpContent={
        <VStack gap={8}>
          <Text weight="semibold">What is a {daoTypeNameRecord[type]}?</Text>
          <Text size={14} color="supporting">
            {daoTypeExplanationRecord[type]}
          </Text>
        </VStack>
      }
    >
      <Container>
        <Text size={32} weight="bold">
          What type of DAO would you like to create?
        </Text>
        <PrimarySelect
          options={daoTypes}
          getName={(type) => daoTypeNameRecord[type]}
          onSelect={(type) => formInput({ type })}
          selectedOption={type}
          groupName="dao-type"
        />
      </Container>
    </WizardBody>
  );
};
