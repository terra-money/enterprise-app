import { useCW20TokenInfoQuery } from 'queries/useCW20TokenInfoQuery';
import Big from 'big.js';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDaoAddress } from 'dao/navigation';

export const TokenDaoTotalSupplyPanel = () => {
  const address = useCurrentDaoAddress();

  const { data: token } = useCW20TokenInfoQuery(address);

  const totalSupply = token === undefined ? Big(0) : demicrofy(Big(token.total_supply) as u<Big>, token.decimals);

  return <NumericPanel title="Total supply" value={totalSupply} suffix={token?.symbol} />;
};
