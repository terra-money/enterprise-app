import { ConnectWallet } from "chain/components/ConnectWallet";
import { ConditionalWallet } from "components/conditional-wallet";
import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { Panel } from "lib/ui/Panel/Panel";
import { HStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton";
import { useContractInfoQuery } from "queries/useContractInfoQuery";
import { useEnterpriseLatestCodeIdQuery } from "queries/useEnterpriseCodeIdsQuery";
import { UpgradeDAOPromptActions } from "./UpgradeDAOPromptActions";

export const UpgradeDaoPrompt = () => {
  const dao = useCurrentDao();
  const { data: contractInfo } = useContractInfoQuery(dao.address);

  const { data: latestCodeId } = useEnterpriseLatestCodeIdQuery()

  if (!contractInfo || !latestCodeId) {
    return null;
  }

  if (latestCodeId === contractInfo.code_id) {
    return null;
  }

  return (
    <Panel>
      <HStack justifyContent="space-between" fullWidth alignItems="center" gap={16} wrap="wrap">
        <Text weight="semibold">Upgrade this DAO to the latest version of smart contracts.</Text>
        <ConditionalWallet
          connected={() => <UpgradeDAOPromptActions />}
          notConnected={() => <ConnectWallet
            renderOpener={({ onClick }) => (
              <PrimaryButton kind="primary" onClick={onClick}>
                Connect wallet
              </PrimaryButton>
            )}
          />}
        />
      </HStack>
    </Panel>
  )
}