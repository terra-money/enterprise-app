import Big from 'big.js';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

export const toDao = ({ gov_config, dao_council, enterprise_factory_contract, dao_type, metadata, dao_membership_contract, funds_distributor_contract }: enterprise.DaoInfoResponse): DAO => new DAO(
  enterprise_factory_contract,
  dao_type,
  metadata.name,
  metadata.description || undefined,
  metadata.logo === 'none' ? undefined : metadata.logo.url,
  dao_membership_contract,
  enterprise_factory_contract,
  funds_distributor_contract,
  {
    discord_username: metadata.socials.discord_username || undefined,
    github_username: metadata.socials.github_username || undefined,
    telegram_username: metadata.socials.telegram_username || undefined,
    twitter_username: metadata.socials.twitter_username || undefined,
  },
  {
    quorum: Big(gov_config.quorum).toNumber(),
    threshold: Big(gov_config.threshold).toNumber(),
    vetoThreshold: Big(gov_config.veto_threshold ?? gov_config.threshold).toNumber(),
    unlockingPeriod: gov_config.unlocking_period,
    voteDuration: gov_config.vote_duration,
    minimumDeposit: gov_config.minimum_deposit || undefined,
    allowEarlyProposalExecution: gov_config.allow_early_proposal_execution || false,
  },
  dao_council || undefined
)