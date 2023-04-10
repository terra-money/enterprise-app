import { ProposalForm } from '../shared/ProposalForm';
import { toUpgradeDaoMsg } from './helpers/toUpgradeDaoMsg';
import { useContractInfoQuery } from 'queries/useContractInfoQuery';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useEnterpriseLatestCodeIdQuery } from 'queries/useEnterpriseCodeIdsQuery';
import { Text, Throbber } from 'components/primitives';
import { assertDefined } from '@terra-money/apps/utils';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { base64Encode } from 'utils';
import { useWallet } from '@terra-money/wallet-provider';

export const UpgradeProposalForm = () => {
  const { network } = useWallet();

  const dao = useCurrentDao();

  const { data: contractInfo, isLoading: isLoadingContract } = useContractInfoQuery(dao.enterprise_factory_contract);
  const { data: latestCodeId, isLoading: isLoadingLatestCodeId } = useEnterpriseLatestCodeIdQuery()

  const isUpToDate = latestCodeId && contractInfo ? latestCodeId === contractInfo.code_id : undefined;

  const upgradeMessage = `Upgrade to Code ID ${latestCodeId}`;

  return (
    <LoadingPage isLoading={isLoadingContract || isLoadingLatestCodeId}>
      <ProposalForm
        disabled={isUpToDate}
        initialState={{
          title: upgradeMessage,
          description: upgradeMessage,
        }}
        getProposalActions={() => {
          const currentCodeId = contractInfo?.code_id ?? 0;

          const migrationChangeCodeId = network.name === 'mainnet' ? 788 : 5877;

          // we have changed the migration message format which means that in order to upgrade
          // to the new contract we need to still provide the older migration format
          const migrateMsg = currentCodeId < migrationChangeCodeId ? '{}' : base64Encode({});

          return [{ upgrade_dao: toUpgradeDaoMsg(assertDefined(latestCodeId), migrateMsg) }];
        }}
      >
        {isUpToDate === undefined ? (
          <Throbber />
        ) : (
          <Text variant="heading4">{isUpToDate ? 'Your DAO is up-to-date!' : upgradeMessage}</Text>
        )}
      </ProposalForm>
    </LoadingPage>
  );
};
