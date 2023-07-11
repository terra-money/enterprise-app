import { ProposalForm } from '../shared/ProposalForm';
import { toUpgradeDaoMsg } from './helpers/toUpgradeDaoMsg';
import { useContractInfoQuery } from 'queries/useContractInfoQuery';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useEnterpriseLatestCodeIdQuery } from 'queries/useEnterpriseCodeIdsQuery';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { base64Encode } from 'utils';
import { Text } from 'lib/ui/Text';
import { WasmMsgInput } from 'components/wasm-msg-input';
import { useMemo, useState } from 'react';
import { VStack } from 'lib/ui/Stack';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { Spinner } from 'lib/ui/Spinner';
import { Center } from 'lib/ui/Center';

interface FormatMigrationMsgParams {
  msg: string;
  networkName: string;
  currentCodeId: number;
}

const defaultMigrateMsg = '{}';

const formatMigrateMsg = ({ msg, networkName, currentCodeId }: FormatMigrationMsgParams) => {
  const json = JSON.parse(msg === '' ? defaultMigrateMsg : msg);

  const migrationChangeCodeId = networkName === 'mainnet' ? 788 : 5877;

  return currentCodeId < migrationChangeCodeId ? JSON.stringify(json) : base64Encode(json);
};

export const UpgradeProposalForm = () => {
  const dao = useCurrentDao();

  const networkName = useNetworkName();

  const { data: contractInfo, isLoading: isLoadingContract } = useContractInfoQuery(dao.address);
  const { data: latestCodeId, isLoading: isLoadingLatestCodeId } = useEnterpriseLatestCodeIdQuery();

  const isUpToDate = latestCodeId && contractInfo ? latestCodeId === contractInfo.code_id : undefined;

  const upgradeMessage = `Upgrade to Code ID ${latestCodeId} \n`;
  const changeLogMessage = `Feature added: DAOs can now specify a minimum weight a user needs to have to be eligible for rewards`;

  const [message, setMessage] = useState(defaultMigrateMsg);
  const migrateMsg = useMemo(() => {
    try {
      return formatMigrateMsg({ msg: message, networkName, currentCodeId: contractInfo?.code_id ?? 0 });
    } catch {
      return undefined;
    }
  }, [contractInfo?.code_id, message, networkName]);

  const isDisabled = migrateMsg === undefined || isUpToDate !== false;

  if (isLoadingContract || isLoadingLatestCodeId) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <ProposalForm
      disabled={isDisabled}
      initialState={{
        title: upgradeMessage,
        description: upgradeMessage,
      }}
      getProposalActions={() => {
        return [{ upgrade_dao: toUpgradeDaoMsg(assertDefined(latestCodeId), assertDefined(migrateMsg)) }];
      }}
    >
      {isUpToDate === false && (
        <>
          <WasmMsgInput
            label="Migration message (optional)"
            error={migrateMsg === undefined ? 'Invalid JSON' : undefined}
            valid
            placeholder="Type your migration message here"
            value={message}
            onChange={(value) => setMessage(value || '')}
          />
          <VStack gap={4}>
            <Text weight="bold">{upgradeMessage}</Text>
            <Text color="supporting">{changeLogMessage}</Text>
          </VStack>
        </>
      )}

      {isUpToDate === true && <Text weight="bold">Your DAO is up-to-date!</Text>}

      {isUpToDate === undefined && <Spinner />}
    </ProposalForm>
  );
};
