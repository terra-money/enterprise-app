import { WizardBody } from './WizardBody';
import { Text } from 'components/primitives';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';

const daoTypes = ['multisig', 'nft', 'token'] as const;
type DaoType = typeof daoTypes[number];

const daoTypeNameRecord: Record<DaoType, string> = {
  multisig: 'Multisig Wallet',
  nft: 'NFT Community DAO',
  token: 'Community Token DAO',
};

const daoTypeExplanationRecord: Record<DaoType, string> = {
  multisig: 'A "multisig" is a shared wallet, typically with two or more members authorizing transactions.',
  nft: 'NFT Community DAOs leverage NFTs as membership, giving NFT holders voting power to make decisions.',
  token:
    'Community Token DAOs leverage community tokens as membership, giving token holders voting power to make decisions',
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
          <Text variant="heading4">What is a {daoTypeNameRecord[type]}?</Text>
          <Text variant="text">{daoTypeExplanationRecord[type]}</Text>
        </VStack>
      }
    >
      <Container>
        <Text variant="heading2">What type of DAO would you like to create?</Text>
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
