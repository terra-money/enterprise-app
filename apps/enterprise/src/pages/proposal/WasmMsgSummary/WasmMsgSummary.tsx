import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { CurrentDAOTokenProvider } from 'dao/components/CurrentDaoTokenProvider';
import { ExecuteMsgInput } from 'pages/create-proposal/execute/helpers/toExecuteMsg';
import { MintTokenSummary } from './MintTokenSummary';
import { CurrentAssetInfoProvider } from 'chain/components/AssetInfoProvider';
import { SendAssetSummary } from './SendAssetSummary';
import { BurnTokenSummary } from './BurnTokenSummary';
import { DelegateSummary } from './DelegateSummary';
import { UndelegateSummary } from './UndelegateSummary';
import { RedelegateSummary } from './RedelegateSummary';
import { MintNftSummary } from './MintNftSummary';

interface WasmMsgSummaryProps {
  msg: ExecuteMsgInput;
}

export const WasmMsgSummary = ({ msg: fullMsg }: WasmMsgSummaryProps) => {
  const { dao_type } = useCurrentDao();

  if ('wasm' in fullMsg) {
    const { wasm } = fullMsg;
    const msg = wasm?.execute?.msg;
    const contractAddr = wasm?.execute?.contract_addr;
    if ('mint' in msg) {
      const { mint } = msg;
      if (dao_type === 'token') {
        return (
          <CurrentDAOTokenProvider>
            <MintTokenSummary {...mint} />
          </CurrentDAOTokenProvider>
        );
      } else if (dao_type === 'nft') {
        return <MintNftSummary owner={mint.owner} />;
      }
    } else if ('transfer' in msg && contractAddr) {
      const { transfer } = msg;
      return (
        <CurrentAssetInfoProvider id={contractAddr} type="cw20">
          <SendAssetSummary recipient={transfer.recipient} amount={transfer.amount} />
        </CurrentAssetInfoProvider>
      );
    } else if ('burn' in msg) {
      const { burn } = msg;
      return (
        <CurrentDAOTokenProvider>
          <BurnTokenSummary {...burn} />
        </CurrentDAOTokenProvider>
      );
    }
  } else if ('bank' in fullMsg) {
    const { bank } = fullMsg;
    if ('send' in bank) {
      const { send } = bank;
      return (
        <CurrentAssetInfoProvider id={send.amount[0].denom} type="native">
          <SendAssetSummary recipient={send.to_address} amount={send.amount[0].amount} />
        </CurrentAssetInfoProvider>
      );
    }
  } else if ('staking' in fullMsg) {
    const { staking } = fullMsg;
    if (!staking) return null;

    if ('delegate' in staking) {
      const { delegate } = staking;
      console.log(delegate);
      if (!delegate) return null;

      return (
        <CurrentAssetInfoProvider id={delegate.amount.denom} type="native">
          <DelegateSummary validator={delegate.validator} amount={delegate.amount.amount} />
        </CurrentAssetInfoProvider>
      );
    } else if ('undelegate' in staking) {
      const { undelegate } = staking;
      if (!undelegate) return null;

      return (
        <CurrentAssetInfoProvider id={undelegate.amount.denom} type="native">
          <UndelegateSummary validator={undelegate.validator} amount={undelegate.amount.amount} />
        </CurrentAssetInfoProvider>
      );
    } else if ('redelegate' in staking) {
      const { redelegate } = staking;
      if (!redelegate) return null;

      return (
        <CurrentAssetInfoProvider id={redelegate.amount.denom} type="native">
          <RedelegateSummary
            srcValidator={redelegate.src_validator}
            distValidator={redelegate.dst_validator}
            amount={redelegate.amount.amount}
          />
        </CurrentAssetInfoProvider>
      );
    }
  }

  return null;
};
