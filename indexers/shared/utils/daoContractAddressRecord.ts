export type NetworkName = 'mainnet' | 'testnet';

export type DaoContract = 'enterprise-factory' | 'enterprise-facade' | 'enterprise-versioning';

export const daoContractAddressRecord: Record<DaoContract, Record<NetworkName, string>> = {
  'enterprise-factory': {
    mainnet: 'terra1y2dwydnnnctdwwmvs23ct60fj626t66qk53cae2gc55k3ce92jmqldj0sf',
    testnet: 'terra1rafjglr2gl7l66dmjmvc2r2lct57dpdfzvjfpdxjy5mk5gfk38mssegvy9',
  },
  'enterprise-facade': {
    mainnet: '',
    testnet: 'terra1xjnxvwrk8vj4ju6rclgy5sm47a0ll8lux54jdjyhntzgwycmeuyq5wvvm5',
  },
  'enterprise-versioning': {
    mainnet: '',
    testnet: 'terra1ye4hfjvpehz6u9m25nhvsgj0q9d2yqjswxkay9tdgmu6mujau5kqz9e7zz',
  },
};
