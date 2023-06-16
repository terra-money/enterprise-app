import { AssetWithPrice } from "chain/Asset"
import { SameWidthChildrenRow } from "lib/ui/Layout/SameWidthChildrenRow"
import { Panel } from "lib/ui/Panel/Panel"
import styled from "styled-components"

interface AssetItemProps {
  asset: AssetWithPrice
}

const Content = styled(SameWidthChildrenRow)`
  justify-items: center;
  > * {
    :first-child {
      justify-self: start;
    }
  }
  > * {
    :last-child {
      justify-self: end;
    }
  }
`

const Container = styled(Panel)`
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
  padding: 16px;
`

export const AssetItem = ({ asset }: AssetItemProps) => {
  return (
    <Container>
      <Content gap={8}>
        <div>{asset.id}</div>
        <div>{asset.balance}</div>
        <div>{asset.usd}</div>
      </Content>
    </Container>
  )
}