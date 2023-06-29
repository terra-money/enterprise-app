import { Asset } from '../Asset';
import { LCDClient } from '@terra-money/feather.js';

interface GetAssetBalance {
  asset: Asset;
  address: string;
  lcd: LCDClient;
}

interface CW20BalanceResponse {
  balance?: string;
}

export const getAssetBalance = async ({ asset, address, lcd }: GetAssetBalance) => {
  const { id, type } = asset;

  if (type === 'native') {
    const coins = await lcd.bank.spendableBalances(address).then(([coins]) => coins);
    if (!coins) return '0';

    const coin = coins.get(asset.id);

    return coin?.amount?.toString() ?? '0';
  }

  const { balance } = await lcd.wasm.contractQuery<CW20BalanceResponse>(id, {
    balance: {
      address,
    },
  });

  return balance ?? '0';
};
