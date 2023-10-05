export type NetworkName = 'mainnet' | 'testnet';

export type DaoContract = 'enterprise-factory' | 'enterprise-facade' | 'enterprise-versioning';

export const daoContractAddressRecord: Record<DaoContract, Record<NetworkName, string>> = {
  'enterprise-factory': {
    mainnet: 'terra1y2dwydnnnctdwwmvs23ct60fj626t66qk53cae2gc55k3ce92jmqldj0sf',
    testnet: 'terra16vhaar9vhysnr8y5qrs20gecactkc6cxdehzzf487rh60eqst25q3wk77r',
  },
  'enterprise-facade': {
    mainnet: '',
    testnet: 'terra1v5tw0fq7hdnjh2pg7xxxnm98n2mk56h0qnc3zk68s9s7t74yja0s3wgurm',
  },
  'enterprise-versioning': {
    mainnet: '',
    testnet: 'terra1ye4hfjvpehz6u9m25nhvsgj0q9d2yqjswxkay9tdgmu6mujau5kqz9e7zz',
  },
};
