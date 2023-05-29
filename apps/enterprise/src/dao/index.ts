import { enterprise } from 'types/contracts';

export const daoTypes: enterprise.DaoType[] = ['token', 'nft', 'multisig'];

export const daoTypeName: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT',
  token: 'Token',
};

export interface DaoInfo extends enterprise.DaoInfoResponse {
  address: string;
}
