import { Stack } from 'lib/ui/Stack';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { enterprise } from 'types/contracts';
import { CW20TokenInfoResponse, CW721ContractInfoResponse, MultisigVoter } from 'queries';
import { Text } from 'lib/ui/Text';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import Big from 'big.js';
import { Address } from 'chain/components/Address';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import { booleanMatch } from 'lib/shared/utils/match';
import { SeparatedByLine } from 'lib/ui/SeparatedByLine';
import { Match } from 'lib/ui/Match';
import { TokenAddressInput } from '../token/TokenAddressInput';
import { MultisigAddressInput } from '../multisig/MultisigAddressInput';
import { NftAddressInput } from '../nft/NftAddressInput';

const daoNameRecord: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT',
  token: 'Token',
};

const CW20TokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW20TokenInfoResponse }) => {
  return (
    <Stack gap={8} direction="column">
      <Text size={14} color="supporting">
        Name
      </Text>
      <Text weight="semibold">{token.name}</Text>
      <Text size={14} color="supporting">
        Symbol
      </Text>
      <Text weight="semibold">{token.symbol}</Text>
      <Text size={14} color="supporting">
        CW20 Address
      </Text>
      <Address value={tokenAddr} length="l" />
      <Text size={14} color="supporting">
        Total supply
      </Text>
      <Text weight="semibold">
        {formatAmount(fromChainAmount(Big(token.total_supply).toNumber(), token.decimals), { decimals: 2 })}
      </Text>
    </Stack>
  );
};

const NFTTokenInformation = ({ tokenAddr, token }: { tokenAddr: string; token: CW721ContractInfoResponse }) => {
  return (
    <Stack gap={8} direction="column">
      <Text size={14} color="supporting">
        Name
      </Text>
      <Text weight="semibold">{token.name}</Text>
      <Text size={14} color="supporting">
        Symbol
      </Text>
      <Text weight="semibold">{token.symbol}</Text>
      <Text size={14} color="supporting">
        CW721 Address
      </Text>
      <Address value={tokenAddr} length="l" />
    </Stack>
  );
};

const MultisigVotersInformation = ({ multisigAddr, voters }: { multisigAddr: string; voters: MultisigVoter[] }) => {
  return (
    <Stack gap={8} direction="column">
      <Text size={14} color="supporting">
        Number of members
      </Text>
      <Text weight="semibold">{voters.length}</Text>
      <Text size={14} color="supporting">
        CW3 Address
      </Text>
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
    <Stack direction="row">
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
      <SeparatedByLine gap={24}>
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
        {shouldImport && (
          <Match
            value={type}
            token={() => <TokenAddressInput />}
            multisig={() => <MultisigAddressInput />}
            nft={() => <NftAddressInput />}
          />
        )}
      </SeparatedByLine>
    </WizardStep>
  );
}
