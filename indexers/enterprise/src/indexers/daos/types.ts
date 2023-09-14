import { enterprise_facade } from 'types/contracts';

export type DaoEntity = {
  _type: string;
  address: string;
  type: enterprise_facade.DaoType;
  name: string;
  description?: string;
  lowerCaseName: string;
  logo?: string;
  membershipContractAddress: string;
  enterpriseFactoryContract: string;
  created: number;
  codeVersionId: string;
  council: enterprise_facade.DaoCouncil;
  socials: {
    discord_username?: string;
    github_username?: string;
    telegram_username?: string;
    twitter_username?: string;
  };
  config: {
    quorum: number;
    threshold: number;
    vetoThreshold: number;
    unlockingPeriod: enterprise_facade.Duration;
    voteDuration: number;
    minimumDeposit?: string;
  };
};
