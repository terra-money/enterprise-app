export type NetworkName = 'mainnet' | 'testnet';

export type DaoContract = 'enterprise-factory' | 'enterprise-facade';

export const daoContractAddressRecord: Record<DaoContract, Record<NetworkName, string>> = {
  'enterprise-factory': {
    mainnet: 'terra1y2dwydnnnctdwwmvs23ct60fj626t66qk53cae2gc55k3ce92jmqldj0sf',
    testnet: 'terra1vwfllxsuvkyhfztv7yenv0wjra2ue7zu6arc3esmwcckenpq566sxch3wk',
  },
  'enterprise-facade': {
    mainnet: '',
    testnet: 'terra1jyy4r09tgn55ysa5r0fmz20k9q9akjh7r6jrhc4vftdakfaly0sqe7ewyj',
  },
};
