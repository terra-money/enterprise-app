export type NetworkName = 'mainnet' | 'testnet';

export type DaoContract = 'enterprise-factory' | 'enterprise-facade' | 'enterprise-versioning';

export const daoContractAddressRecord: Record<DaoContract, Record<NetworkName, string>> = {
  'enterprise-factory': {
    mainnet: 'terra1y2dwydnnnctdwwmvs23ct60fj626t66qk53cae2gc55k3ce92jmqldj0sf',
    testnet: 'terra16vhaar9vhysnr8y5qrs20gecactkc6cxdehzzf487rh60eqst25q3wk77r',
  },
  'enterprise-facade': {
    mainnet: '',
    testnet: 'terra1f703p463k4xfltsk3q0k6z02tkrerxyqpy3jryuqkt0z7qv3z59qyxklfs',
  },
  'enterprise-versioning': {
    mainnet: '',
    testnet: 'terra1ye4hfjvpehz6u9m25nhvsgj0q9d2yqjswxkay9tdgmu6mujau5kqz9e7zz',
  },
};
