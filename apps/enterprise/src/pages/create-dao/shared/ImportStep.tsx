import { Stack } from 'lib/ui/Stack';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { OptionButton } from 'components/option-button';
import { enterprise } from 'types/contracts';
import { TokenAddressInput } from '../token/TokenAddressInput';
import { NftAddressInput } from '../nft/NftAddressInput';
import { MultisigAddressInput } from '../multisig/MultisigAddressInput';
import { CW20TokenInfoResponse, CW721ContractInfoResponse, MultisigVoter } from 'queries';
import { Text } from 'components/primitives';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import Big from 'big.js';
import styles from './ImportStep.module.sass';
import { Address } from 'chain/components/Address';
import { Match } from 'lib/ui/Match';
import { Line } from 'lib/ui/Line';

const daoNameRecord: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT',
  token: 'Token',
};

const CW20TokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW20TokenInfoResponse }) => {
  return (
    <Stack className={styles.tokenInformation} direction="column">
      <Text variant="label">Name</Text>
      <Text variant="heading4">{token.name}</Text>
      <Text variant="label">Symbol</Text>
      <Text variant="heading4">{token.symbol}</Text>
      <Text variant="label">CW20 Address</Text>
      <Address value={tokenAddr} length="l" />
      <Text variant="label">Total supply</Text>
      <Text variant="heading4">
        {formatAmount(fromChainAmount(Big(token.total_supply).toNumber(), token.decimals), { decimals: 2 })}
      </Text>
    </Stack>
  );
};

const NFTTokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW721ContractInfoResponse }) => {
  return (
    <Stack className={styles.tokenInformation} direction="column">
      <Text variant="label">Name</Text>
      <Text variant="heading4">{token.name}</Text>
      <Text variant="label">Symbol</Text>
      <Text variant="heading4">{token.symbol}</Text>
      <Text variant="label">CW721 Address</Text>
      <Address value={tokenAddr} length="l" />
    </Stack>
  );
};

const MultisigVotersInformation = ({ multisigAddr, voters }: { multisigAddr: string; voters: MultisigVoter[] }) => {
  return (
    <Stack className={styles.tokenInformation} direction="column">
      <Text variant="label">Number of members</Text>
      <Text variant="heading4">{voters.length}</Text>
      <Text variant="label">CW3 Address</Text>
      <Address value={multisigAddr} length="l" />
    </Stack>
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
    <Stack direction="row" className={styles.helpContent}>
      {type === 'token' && existingToken && (
        <CW20TokenInformation tokenAddr={existingTokenAddr} token={existingToken} />
      )}
      {type === 'nft' && existingNFT && <NFTTokenInformation tokenAddr={existingNFTAddr} token={existingNFT} />}
      {type === 'multisig' && existingMultisigVoters && (
        <MultisigVotersInformation multisigAddr={existingMultisigAddr} voters={existingMultisigVoters} />
      )}
    </Stack>
  );

  return (
    <WizardStep title={`Do you have an existing ${daoName}?`} helpContent={helpContent}>
      <Stack direction="column" gap={24}>
        <Stack gap={24} direction="column">
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
              <Line />
              <Match
                value={type}
                token={() => <TokenAddressInput />}
                multisig={() => <MultisigAddressInput />}
                nft={() => <NftAddressInput />}
              />
            </>
          )}
        </Stack>
      </Stack>
    </WizardStep>
  );
}
