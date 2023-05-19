import { useIsOldDaoVersionQuery } from "dao/hooks/useIsOldDaoVersionQuery"
import { useCurrentDaoAddress } from "dao/navigation"
import { VStack } from "lib/ui/Stack"
import { Text } from "lib/ui/Text"
import { UpgradeDaoActions } from "./UpgradeDaoActions"

export const UpgradeDaoCanFixTheError = () => {
  const address = useCurrentDaoAddress()
  const { data: isOldDaoVersion } = useIsOldDaoVersionQuery(address)

  if (!isOldDaoVersion) return null

  return (
    <VStack gap={16}>
      <Text>
        This UI is not compatible with the DAO smart contract version. Upgrade your DAO to the latest version to fix this error.
      </Text>
      <UpgradeDaoActions />
    </VStack>
  )
}