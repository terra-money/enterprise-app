import { CreateDaoMsgType } from 'tx/useCreateDaoTx';
import { toChainAmount } from 'chain/utils/toChainAmount';
import { DaoWizardInput, DaoWizardState } from '../DaoWizardFormProvider';
import { enterprise_factory } from 'types/contracts';
import { assertDefined } from 'lib/shared/utils/assertDefined';

const getDaoMembership = (input: DaoWizardInput) => {
  const {
    type,
    members,
    nftMembership,
    tokenInfo: { name, symbol, decimals, description, marketingOwner, logo, project },
    initialBalances,
    initialDaoBalance,
    daoImport,
  } = input;

  if (daoImport.shouldImport) {
    const existingContractAddr =
      type === 'token'
        ? input.existingTokenAddr
        : type === 'nft'
        ? input.existingNFTAddr
        : type === 'multisig'
        ? input.existingMultisigAddr
        : undefined;

    return {
      existing_membership: {
        dao_type: type,
        membership_contract_addr: assertDefined(existingContractAddr, 'daoAddress'),
      },
    };
  }

  const converter: Record<DaoWizardInput['type'], () => CreateDaoMsgType['create_dao']['dao_membership']> = {
    multisig: () => ({
      new_membership: {
        new_multisig: {
          multisig_members: members.map((member) => ({ address: member.addr, weight: member.weight.toString() })),
        },
      },
    }),
    nft: () => ({
      new_membership: {
        new_nft: {
          minter: nftMembership.minter || null,
          nft_name: nftMembership.nftName,
          nft_symbol: nftMembership.nftSymbol,
        },
      },
    }),
    token: () => ({
      new_membership: {
        new_token: {
          initial_token_balances: initialBalances.map(({ address, amount }) => ({
            address,
            amount: toChainAmount(amount, decimals),
          })),
          initial_dao_balance: initialDaoBalance ? toChainAmount(initialDaoBalance, decimals).toString() : null,
          token_decimals: decimals,
          token_marketing: {
            description,
            logo_url: logo,
            marketing_owner: marketingOwner,
            project: project,
          },
          token_name: name,
          token_symbol: symbol,
        },
      },
    }),
  };

  return converter[type]();
};

export const getDaoRatio = (ratio: number) => ratio.toFixed(2);

const getDaoGovConfig = ({ govConfig, type, timeConversionFactor, tokenInfo }: DaoWizardState) => {
  const config: enterprise_factory.DaoGovConfig = {
    quorum: getDaoRatio(govConfig.quorum),
    threshold: getDaoRatio(govConfig.threshold),
    veto_threshold: getDaoRatio(govConfig.vetoThreshold),

    unlocking_period: {
      time: govConfig.unlockingPeriod * timeConversionFactor,
    },
    vote_duration: govConfig.voteDuration * timeConversionFactor,
    allow_early_proposal_execution: !!govConfig.allowEarlyProposalExecution,
  };

  if (type === 'token') {
    config.minimum_deposit = toChainAmount(govConfig.minimumDeposit || 0, tokenInfo.decimals);
  }

  return config;
};

const getMinimumWeightForRewards = ({ govConfig, type, tokenInfo }: DaoWizardState) => {
  const { minimumWeightForRewards } = govConfig;

  if (minimumWeightForRewards === undefined) return undefined;

  if (type === 'token') {
    return toChainAmount(minimumWeightForRewards, tokenInfo.decimals);
  }

  return minimumWeightForRewards.toString();
};

export const toCreateDaoMsg = (input: DaoWizardState): CreateDaoMsgType => {
  const {
    info: { name, logo, description },
    socials,
    council,
    whitelistedAssets,
  } = input;

  return {
    create_dao: {
      dao_council:
        council && council.members.length > 0
          ? {
              members: council.members.map((member) => member.address),
              allowed_proposal_action_types: council.allowedProposalTypes,
              quorum: getDaoRatio(council.quorum),
              threshold: getDaoRatio(council.threshold),
            }
          : null,
      dao_membership: getDaoMembership(input),
      dao_metadata: {
        logo: logo ? { url: logo } : 'none',
        name,
        description,
        socials: {
          github_username: socials.githubUsername,
          twitter_username: socials.twitterUsername,
          discord_username: socials.discordUsername,
          telegram_username: socials.telegramUsername,
        },
      },
      minimum_weight_for_rewards: getMinimumWeightForRewards(input),
      dao_gov_config: getDaoGovConfig(input),
      asset_whitelist: whitelistedAssets.length > 0 ? whitelistedAssets : null,
    },
  };
};
