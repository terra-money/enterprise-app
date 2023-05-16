import { enterprise } from "types/contracts";

// TODO: share this type with indexers/enterprise/src/indexers/daos/types.ts

export type Dao = {
  _type: string;
  address: string;
  type: enterprise.DaoType;
  name: string;
  description?: string;
  lowerCaseName: string;
  logo?: string;
  membershipContractAddress: string;
  enterpriseFactoryContract: string;
  created: number;
  codeVersionId: string;
  council: enterprise.DaoCouncil;
  tvl: number;
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
    unlockingPeriod: enterprise.Duration;
    voteDuration: number;
    minimumDeposit?: string;
  };
};
