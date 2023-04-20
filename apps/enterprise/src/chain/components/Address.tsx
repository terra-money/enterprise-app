import { truncateAddress } from "@terra-money/apps/utils"
import { useClipboardCopy } from "hooks"
import { Text } from "lib/ui/Text"
import { defaultTransitionCSS } from "lib/ui/animations/transitions"
import { CopyIcon } from "lib/ui/icons/CopyIcon"
import styled from "styled-components"

interface AddressProps {
  value: string
}

const Container = styled(Text)`
  cursor: pointer;
  /* color: ${({ theme }) => theme.colors.textSupporting.toCssValue()}; */
  ${defaultTransitionCSS}

  &:hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }

  svg {
    display: inline;
    margin-left: 4px;
  }
`

export const Address = ({ value }: AddressProps) => {
  const clipboardCopy = useClipboardCopy();
  return (

    <Container onClick={() => {
      clipboardCopy({ value, message: 'Address copied to clipboard!' })
    }} as="span" >
      {truncateAddress(value)}
      <CopyIcon />
    </Container>
  )
}