import { Container } from '@terra-money/apps/components';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { OptionButton } from 'components/option-button';
import { ConditionalRender, Divider } from 'components/primitives';
import { enterprise } from 'types/contracts';
import { TokenAddressInput } from '../token/TokenAddressInput';
import { NftAddressInput } from '../nft/NftAddressInput';
import { MultisigAddressInput } from '../multisig/MultisigAddressInput';
import { CW20TokenInfoResponse, CW721ContractInfoResponse, MultisigVoter } from 'queries';
import { Text } from 'components/primitives';
import { Address } from 'components/address';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import Big from 'big.js';
import { u } from '@terra-money/apps/types';
import styles from './ImportStep.module.sass';

const daoNameRecord: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT',
  token: 'Token',
};

const CW20TokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW20TokenInfoResponse }) => {
  return (
    <Container className={styles.tokenInformation} direction="column">
      <Text variant="label">Name</Text>
      <Text variant="heading4">{token.name}</Text>
      <Text variant="label">Symbol</Text>
      <Text variant="heading4">{token.symbol}</Text>
      <Text variant="label">CW20 Address</Text>
      <Address address={tokenAddr} truncation={[20, 20]} textProps={{ variant: 'heading4' }} />
      <Text variant="label">Total supply</Text>
      <Text variant="heading4">
        {formatAmount(demicrofy(Big(token.total_supply) as u<Big>, token.decimals), { decimals: 2 })}
      </Text>
    </Container>
  );
};

const NFTTokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW721ContractInfoResponse }) => {
  return (
    <Container className={styles.tokenInformation} direction="column">
      <Text variant="label">Name</Text>
      <Text variant="heading4">{token.name}</Text>
      <Text variant="label">Symbol</Text>
      <Text variant="heading4">{token.symbol}</Text>
      <Text variant="label">CW721 Address</Text>
      <Address address={tokenAddr} truncation={[20, 20]} textProps={{ variant: 'heading4' }} />
    </Container>
  );
};

const MultisigVotersInformation = ({ multisigAddr, voters }: { multisigAddr: string; voters: MultisigVoter[] }) => {
  return (
    <Container className={styles.tokenInformation} direction="column">
      <Text variant="label">Number of members</Text>
      <Text variant="heading4">{voters.length}</Text>
      <Text variant="label">CW3 Address</Text>
      <Address address={multisigAddr} truncation={[20, 20]} textProps={{ variant: 'heading4' }} />
    </Container>
  );
};

export function ImportStep() {
  const {
    formState: {
      daoImport,
      type,
      existingTokenAddr,
      existingToken,
      existingNFTAddr,
      existingNFT,
      existingMultisigAddr,
      existingMultisigVoters,
    },
    formInput,
  } = useDaoWizardForm();

  const { shouldImport } = daoImport;

  const daoName = daoNameRecord[type];

  const helpContent = shouldImport && (
    <Container className={styles.helpContent}>
      {type === 'token' && existingToken && (
        <CW20TokenInformation tokenAddr={existingTokenAddr} token={existingToken} />
      )}
      {type === 'nft' && existingNFT && <NFTTokenInformation tokenAddr={existingNFTAddr} token={existingNFT} />}
      {type === 'multisig' && existingMultisigVoters && (
        <MultisigVotersInformation multisigAddr={existingMultisigAddr} voters={existingMultisigVoters} />
      )}
    </Container>
  );

  return (
    <WizardStep title={`Do you have an existing ${daoName}?`} helpContent={helpContent}>
      <Container direction="column" gap={24}>
        <Container gap={24} direction="column">
          <OptionButton
            title={`No, create a new ${daoName}`}
            active={!shouldImport}
            onClick={() => formInput({ daoImport: { ...daoImport, shouldImport: false } })}
          />
          <OptionButton
            title={`Yes, find my ${daoName}`}
            active={shouldImport}
            onClick={() => formInput({ daoImport: { ...daoImport, shouldImport: true } })}
          />
          {shouldImport && (
            <>
              <Divider />
              <ConditionalRender
                value={type}
                token={() => <TokenAddressInput />}
                multisig={() => <MultisigAddressInput />}
                nft={() => <NftAddressInput />}
              />
            </>
          )}
        </Container>
      </Container>
    </WizardStep>
  );
}
