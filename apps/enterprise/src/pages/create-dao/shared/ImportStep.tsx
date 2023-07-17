import { Stack } from 'lib/ui/Stack';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { enterprise } from 'types/contracts';
import { CW20TokenInfoResponse, CW721ContractInfoResponse, MultisigVoter } from 'queries';
import { Text } from 'components/primitives';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import Big from 'big.js';
import styles from './ImportStep.module.sass';
import { Address } from 'chain/components/Address';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import { booleanMatch } from 'lib/shared/utils/match';

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
        <PrimarySelect<boolean>
          options={[false, true]}
          getName={(option) =>
            booleanMatch(option, {
              false: () => `No, create a new ${daoName}`,
              true: () => `Yes, find my ${daoName}`,
            })
          }
          selectedOption={shouldImport}
          onSelect={(shouldImport) => formInput({ daoImport: { ...daoImport, shouldImport } })}
          groupName="proposal-type"
        />
      </Stack>
    </WizardStep>
  );
}
