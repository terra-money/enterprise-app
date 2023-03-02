import { DAOLogo } from "components/dao-logo"
import { HStack } from "lib/ui/Stack"

interface LogoValueViewProps {
  value: string
}

export const LogoValueView = ({ value }: LogoValueViewProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      <DAOLogo logo={value} />
      {value}
    </HStack>
  )
}