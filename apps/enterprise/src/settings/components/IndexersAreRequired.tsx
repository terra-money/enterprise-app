import { ComponentWithChildrenProps } from "lib/shared/props"
import { Panel } from "lib/ui/Panel/Panel"
import { HStack } from "lib/ui/Stack"
import { useAreIndexersEnabled } from "state/hooks/useAreIndexersEnabled"
import { AreIndexersEnabledControl } from "./AreIndexersEnabledControl"
import { Text } from "lib/ui/Text"
import { InfoIcon } from "lib/ui/icons/InfoIcon"

export const IndexersAreRequired = ({ children }: ComponentWithChildrenProps) => {
  const [areIndexersEnabled] = useAreIndexersEnabled()

  if (areIndexersEnabled) {
    return <>{children}</>
  }

  return (
    <Panel>
      <HStack fullWidth alignItems="center" gap={16} wrap="wrap" justifyContent="space-between">
        <HStack alignItems="center" gap={8}>
          <Text as="span" color="idle"><InfoIcon /></Text>
          <Text weight="semibold">This feature requires indexers</Text>
        </HStack>

        <AreIndexersEnabledControl />
      </HStack>
    </Panel>
  )
}