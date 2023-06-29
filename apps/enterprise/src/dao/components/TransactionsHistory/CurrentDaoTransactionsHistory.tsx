import { VStack } from "lib/ui/Stack"
import { Text } from "lib/ui/Text"
import { useTxsQuery } from "queries/useTxsQuery"
import { useCurrentDao } from "../CurrentDaoProvider"
import { QueryDependant } from "lib/query/components/QueryDependant"
import { TxItem } from "pages/dao/treasury/TxItem"

export const CurrentDaoTransactionsHistory = () => {
  const { address } = useCurrentDao()
  const { data: txs, status } = useTxsQuery(address);

  return (
    <VStack gap={38}>
      <Text size={16} weight='semibold'>
        Transactions
      </Text>
      <QueryDependant
        status={status}
        data={txs}
        error={() => <Text>Failed to load transactions</Text>}
        loading={() => <Text>Loading transactions</Text>}
        success={(data) => data.map((tx) => <TxItem tx={tx} />)} />
    </VStack>
  )
}