import { DaoType, DaoCouncil, Duration } from 'types/enterprise_facade';

export type DaoEntity = {
  _type: string;
  address: string;
  type: DaoType;
  name: string;
  description?: string;
  lowerCaseName: string;
  logo?: string;
  membershipContractAddress: string;
  enterpriseFactoryContract: string;
  created: number;
  codeVersionId: string;
  council: DaoCouncil;
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
    unlockingPeriod: Duration;
    voteDuration: number;
    minimumDeposit?: string;
  };
};
