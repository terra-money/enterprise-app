import { proposalTitle } from '../Page';
import { ProposalForm } from '../shared/ProposalForm';
import { toUpgradeDaoMsg } from './helpers/toUpgradeDaoMsg';
import { useContractInfoQuery } from 'queries/useContractInfoQuery';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useEnterpriseCodeIdsQuery } from 'queries/useEnterpriseCodeIdsQuery';
import { Text, Throbber } from 'components/primitives';
import { assertDefined } from '@terra-money/apps/utils';
import { LoadingPage } from 'pages/shared/LoadingPage';

export const UpgradeProposalForm = () => {
  const dao = useCurrentDao();
  const { data: contractInfo, isLoading: isLoadingContract } = useContractInfoQuery(dao.membershipContractAddress);
  const { data: codeIds, isLoading: isLoadingCodes } = useEnterpriseCodeIdsQuery();

  const latestCodeId = codeIds ? Math.max(...codeIds.map(Number)) : undefined;
  const isUpToDate = latestCodeId && contractInfo ? latestCodeId === contractInfo.code_id : undefined;

  const upgradeMessage = `Upgrade to Code ID ${latestCodeId}`;

  return (
    <LoadingPage isLoading={isLoadingContract || isLoadingCodes}>
      <ProposalForm
        title={proposalTitle.upgrade}
        disabled={isUpToDate}
        initialState={{
          title: upgradeMessage,
          description: upgradeMessage,
        }}
        getProposalActions={() => [{ upgrade_dao: toUpgradeDaoMsg(assertDefined(latestCodeId)) }]}
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
