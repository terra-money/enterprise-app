import { ExternalLink } from "components/link"
import { useBoolean } from "lib/shared/hooks/useBoolean"
import { Modal } from "lib/ui/Modal"
import { VStack } from "lib/ui/Stack"
import { Text } from "lib/ui/Text"
import { ShyTextButton } from "lib/ui/buttons/ShyTextButton"
import { discordUrl, telegramUrl } from "navigation"
import { UpgradeDaoCanFixTheError } from "./UpgradeDaoCanFixTheError"

export const DaoErrorFallback = () => {
  const [isOpen, { unset: close }] = useBoolean(true)

  if (!isOpen) return null

  return (
    <Modal
      title="Something went wrong"
      renderContent={() => (
        <VStack gap={16}>
          <Text>
            Contact us on <ExternalLink to={discordUrl}><ShyTextButton as="div" text="Discord" /></ExternalLink>  or <ExternalLink to={telegramUrl}><ShyTextButton as="div" text="Telegram" /></ExternalLink>  if the problem persists.
          </Text>
          <UpgradeDaoCanFixTheError />
        </VStack>
      )}
      onClose={close}
    />
  )
}