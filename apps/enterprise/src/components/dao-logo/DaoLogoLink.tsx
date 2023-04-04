import { InternalLink } from "components/link"
import { getDaoPath } from "navigation"
import styled from "styled-components"
import { DAOLogo, DAOLogoProps } from "./DAOLogo"

interface DaoLogoLinkProps extends DAOLogoProps {
  address: string
}

const Logo = styled(DAOLogo)`
 :hover {
  background: ${({ theme }) => theme.colors.backgroundGlass2.toCssValue()};
 }
`

export const DaoLogoLink = ({ address, ...rest }: DaoLogoLinkProps) => {
  return (
    <InternalLink to={getDaoPath(address)}>
      <Logo {...rest} />
    </InternalLink>
  )
}