import { enterprise } from 'types/contracts';

export const getDaoLogo = ({ metadata }: enterprise.DaoInfoResponse) => {
  return metadata.logo === 'none' ? undefined : metadata.logo.url;
};
