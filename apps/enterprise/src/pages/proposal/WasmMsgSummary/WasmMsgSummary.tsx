import { useCurrentDao } from "dao/components/CurrentDaoProvider"
import { CurrentDAOTokenProvider } from "dao/components/CurrentDaoTokenProvider"
import { ExecuteMsgInput } from "pages/create-proposal/execute/helpers/toExecuteMsg"
import { MintTokenSummary } from "./MintTokenSummary"
import { CurrentAssetInfoProvider } from "chain/components/AssetInfoProvider"
import { SendAssetSummary } from "./SendAssetSummary"

interface WasmMsgSummaryProps {
  msg: ExecuteMsgInput
}

export const WasmMsgSummary = ({ msg: fullMsg }: WasmMsgSummaryProps) => {
  const { dao_type } = useCurrentDao()

  if ('wasm' in fullMsg) {
    const { wasm } = fullMsg
    const msg = wasm?.execute?.msg
    const contractAddr = wasm?.execute?.contract_addr
    if ('mint' in msg) {
      const { mint } = msg
      if (dao_type === 'token') {
        return (
          <CurrentDAOTokenProvider>
            <MintTokenSummary {...mint} />
          </CurrentDAOTokenProvider>
        )
      } else if (dao_type === 'nft') {
        // TODO: provide NFT summary
        return null
      }
    } else if ('transfer' in msg && contractAddr) {
      const { transfer } = msg
      return (
        <CurrentAssetInfoProvider id={contractAddr} type="cw20">
          <SendAssetSummary recipient={
            transfer.recipient
          }
            amount={transfer.amount}
          />
        </CurrentAssetInfoProvider>
      )
    }
  } if ('bank' in fullMsg) {
    const { bank } = fullMsg
    if ('send' in bank) {
      const { send } = bank
      return (
        <CurrentAssetInfoProvider id={send.amount[0].denom} type="native">
          <SendAssetSummary recipient={
            send.to_address
          }
            amount={send.amount[0].amount}
          />
        </CurrentAssetInfoProvider>
      )
    }
  }

  return null
}