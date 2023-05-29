import { enterprise } from './contracts';

export type DAOSocials = {
  discord_username?: string;
  github_username?: string;
  telegram_username?: string;
  twitter_username?: string;
};

export type DAOGovernanceConfig = {
  quorum: number;
  threshold: number;
  vetoThreshold: number;
  unlockingPeriod: enterprise.Duration;
  voteDuration: number;
  minimumDeposit?: string;
  allowEarlyProposalExecution?: boolean;
};

export class DAO {
  constructor(
    public readonly address: string,
    public readonly type: enterprise.DaoType,
    public readonly name: string,
    public readonly description: string | undefined = undefined,
    public readonly logo: string | undefined = undefined,
    public readonly membershipContractAddress: string,
    public readonly enterpriseFactoryContract: string,
    public readonly fundsDistributorContract: string,
    public readonly socials: DAOSocials,
    public readonly governanceConfig: DAOGovernanceConfig,
    public readonly council?: enterprise.DaoCouncil,
    public readonly tvl?: number
  ) {}
}
