import { demicrofy, formatAmount } from "@terra-money/apps/libs/formatting"
import { Address } from "chain/components/Address"
import { useCurrentDaoToken } from "dao/components/CurrentDaoTokenProvider"
import { Text } from "lib/ui/Text"
import { MintTokenMsg } from "pages/create-proposal/mint/helpers/toMintTokensMsg"

export const MintTokenSummary = ({ recipient, amount }: MintTokenMsg) => {
  const token = useCurrentDaoToken()

  return (
    <Text size={14} color="supporting">Mint <Text weight="bold" as="span">{formatAmount(demicrofy(amount, token.decimals))} {token.symbol}</Text> to <Address value={recipient} /></Text>
  )
}