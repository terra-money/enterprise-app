import { useCW20TokenInfoQuery } from 'queries/useCW20TokenInfoQuery';
import Big from 'big.js';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const TokenDaoTotalSupplyPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data: token } = useCW20TokenInfoQuery(dao_membership_contract);

  const totalSupply = token === undefined ? Big(0) : fromChainAmount(token.total_supply, token.decimals);

  return <NumericPanel title="Total supply" value={totalSupply} suffix={token?.symbol} />;
};
