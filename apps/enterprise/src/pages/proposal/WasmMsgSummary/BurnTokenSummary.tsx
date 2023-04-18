import { demicrofy, formatAmount } from "@terra-money/apps/libs/formatting"
import { useCurrentDaoToken } from "dao/components/CurrentDaoTokenProvider"
import { Text } from "lib/ui/Text"
import { BurnTokenMsg } from "pages/create-proposal/burn/helpers/toBurnTokensMsg"

export const BurnTokenSummary = ({ amount }: BurnTokenMsg) => {
  const token = useCurrentDaoToken()

  return (
    <Text size={14} color="supporting">Burn <Text weight="bold" as="span">{formatAmount(demicrofy(amount, token.decimals))} {token.symbol}</Text></Text>
  )
}